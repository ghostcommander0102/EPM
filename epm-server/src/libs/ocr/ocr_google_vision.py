import cv2
import base64
import json
import requests
import sys
import numpy as np
from PIL import Image, ExifTags
import logger as log
if sys.version_info[0] == 3:  # python 3x
    import queue as qu
if sys.version_info[0] == 2:  # python 2x
    import Queue as qu


ORIENTATION_270_DEGREE = 0
ORIENTATION_180_DEGREE = 1
ORIENTATION_90_DEGREE = 2
ORIENTATION_NORMAL = 3

ROTATE_90_CLOCKWISE = 0
ROTATE_180 = 1
ROTATE_90_COUNTERCLOCKWISE = 2


MAXIMUM_SIZE = 4 * 1024 * 1024  # google could api limitation 4 MB


def load_image(image_path):
    try:
        image = Image.open(image_path)
        orientation = None
        for key in ExifTags.TAGS.keys():
            if ExifTags.TAGS[key] == 'Orientation':
                orientation = key
                break

        exif = dict(image._getexif().items())

        if exif[orientation] == 3:
            image = image.rotate(180, expand=True)
        elif exif[orientation] == 6:
            image = image.rotate(270, expand=True)
        elif exif[orientation] == 8:
            image = image.rotate(90, expand=True)

        cv_img = np.array(image)
        cv_img = cv_img[:, :, ::-1].copy()
        return cv_img
    except (AttributeError, KeyError, IndexError):
        # cases: image don't have getexif
        cv_img = cv2.imread(image_path)
        return cv_img


class VisionUtils:

    def __init__(self, debug=False):

        self.endpoint_url = 'https://vision.googleapis.com/v1/images:annotate'
        self.api_key = 'AIzaSyBsF_irP8H9QbO112UnAo1jmzulKrarq2s'
        self.debug = debug

    def __make_request(self, cv_img, feature_types):
        request_list = []

        # Read the image and convert to json
        h, w = cv_img.shape[:2]
        gray = cv2.cvtColor(cv_img, cv2.COLOR_BGR2GRAY)
        _ratio = float(MAXIMUM_SIZE) / float(h * w)
        _quality = min(int(_ratio * 10) * 10, 100)
        log.log_print("\t _quality: {}".format(_quality))

        content_obj = {'content': base64.b64encode(
            cv2.imencode('.jpg', gray, [cv2.IMWRITE_JPEG_QUALITY, _quality])[1].tostring()).decode('UTF-8')}

        feature_obj = []
        for feature_type in feature_types:
            feature_obj.append({'type': feature_type})

        context_obj = {"languageHints": ['en']}

        request_list.append(
            {'image': content_obj,
             'features': feature_obj,
             'imageContext': context_obj
             }
        )
        return json.dumps({'requests': request_list}).encode()

    def __get_response(self, json_data):
        try:
            response = requests.post(
                url=self.endpoint_url,
                data=json_data,
                params={'key': self.api_key},
                headers={'Content-Type': 'application/json'})

            # print(response)
            ret_json = json.loads(response.text)
            return ret_json['responses'][0]

        except Exception as e:
            print(e)
            return None

    def __get_orientation(self, annos):
        oris = [0, 0, 0, 0]
        for anno in annos:
            ori = self.__rect_orientation(anno=anno)
            oris[ori] += 1
        log.log_print(oris)
        return oris.index(max(oris))

    def __rect_orientation(self, anno):
        points = anno['boundingBox']['vertices']

        centerX = .0
        centerY = .0
        for i in range(4):
            if 'x' not in points[i].keys():
                points[i]['x'] = 0
            if 'y' not in points[i].keys():
                points[i]['y'] = 0
            centerX += points[i]['x'] / 4
            centerY += points[i]['y'] / 4

        x0 = points[0]['x']
        y0 = points[0]['y']

        if x0 < centerX:
            if y0 < centerY:
                """ 
                0 --------- 1
                |           |
                3 --------- 2 """
                return ORIENTATION_NORMAL  # 3
            else:
                """
                1 --------- 2
                |           |
                0 --------- 3 """
                return ORIENTATION_270_DEGREE  # 2

        else:
            if y0 < centerY:
                """
                3 --------- 0
                |           |
                2 --------- 1 """
                return ORIENTATION_90_DEGREE  # 0
            else:
                """
                2 --------- 3
                |           |
                1 --------- 0 """
            return ORIENTATION_180_DEGREE  # 1

    def __correlate_orientation(self, bound, orientation, img_width, img_height):
        for i in range(len(bound)):
            point = bound[i]
            if 'x' not in point.keys():
                point['x'] = 0
            if 'y' not in point.keys():
                point['y'] = 0

            if orientation == ORIENTATION_NORMAL:
                new_x = point['x']
                new_y = point['y']
            elif orientation == ORIENTATION_270_DEGREE:
                new_x = img_height - point['y']
                new_y = point['x']
            elif orientation == ORIENTATION_90_DEGREE:
                new_x = point['y']
                new_y = img_width - point['x']
            elif orientation == ORIENTATION_180_DEGREE:
                new_x = img_width - point['x']
                new_y = img_height - point['y']

            bound[i]['x'] = new_x
            bound[i]['y'] = new_y

    def detect_text(self, path, idx, proc_queue):
        debug = self.debug
        try:
            img = load_image(path)
            log.log_print("\t send request" + path)

            response = self.__get_response(self.__make_request(cv_img=img, feature_types=['DOCUMENT_TEXT_DETECTION',
                                                                                          'LABEL_DETECTION']))
            if response is None:
                result = None
            else:
                # check the label of the uploaded image data
                _flag = False
                for i in range(5):
                    if response['labelAnnotations'][i]['description'] != 'text':
                        _flag = True
                        break

                if not _flag:  # not text image
                    ret_label = response['labelAnnotations'][0]
                    result = {'id': idx,
                              'annotations': None,
                              'label': ret_label,
                              'orientation': None,
                              'image': img}
                else:  # invoice image

                    annos = []
                    document = response['fullTextAnnotation']
                    for page in document['pages']:
                        for block in page['blocks']:
                            for paragraph in block['paragraphs']:
                                for word in paragraph['words']:
                                    text = ""
                                    for symbol in word['symbols']:
                                        text += symbol['text']
                                    anno = {'boundingBox': word['boundingBox'],
                                            'property': word['property'],
                                            'text': text}
                                    annos.append(anno)

                    # recognize the orientation
                    ori = self.__get_orientation(annos=annos)

                    if ori != ORIENTATION_NORMAL:
                        img = cv2.rotate(img, rotateCode=ori)

                    for i in range(0, len(annos)):
                        height, width = img.shape[:2]
                        self.__correlate_orientation(bound=annos[i]['boundingBox']['vertices'], orientation=ori,
                                                     img_width=width, img_height=height)
                        if debug:  # display the line rect
                            for j in range(3):
                                pt0 = annos[i]['boundingBox']['vertices'][j]
                                pt1 = annos[i]['boundingBox']['vertices'][j + 1]
                                cv2.line(img, (pt0['x'], pt0['y']), (pt1['x'], pt1['y']), (255, 0, 0), 1)

                    result = {'id': idx,
                              'annotations': annos,
                              'label': 'text',
                              'orientation': ori,
                              'image': img}

            proc_queue.put(result, True, 1)
            log.log_print("\t receive response " + path)
        except (qu.Empty, qu.Full) as e:
            log.log_print("\t Exceoption " + str(e))
