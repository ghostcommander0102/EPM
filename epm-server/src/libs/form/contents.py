

default_font_name = "Times-Roman"
# default_font_color = "0x000000"  # or black
default_font_color = "0xFF0000"  # or red
default_font_sz = 16
default_img_sz = [2, 0.5]
default_chb_sz = 20

# general
ANNO_PAGE_IDX = "page_idx"
ANNO_TYPE = "type"
# text content
ANNO_TEXT_FONT = "font"
ANNO_TEXT_COLOR = "color"
ANNO_TEXT_POS = "pos"
ANNO_TEXT_SZ = "size"
# image content
ANNO_IMAGE_POS = "pos"
ANNO_IMAGE_SZ = "size"
# checkbox
ANNO_CHB_POS = "pos"
ANNO_CHB_SZ = "size"


class TextContent:
    def __init__(self, annotation_info, value):
        self.type = "text"
        self.page_idx = annotation_info.get(ANNO_PAGE_IDX, 0)

        if not value:
            self.text = None
        else:
            self.text = value
        self.x, self.y = annotation_info.get(ANNO_TEXT_POS)[:2]

        self.font_color = annotation_info.get(ANNO_TEXT_COLOR, default_font_color)
        self.font_sz = annotation_info.get(ANNO_TEXT_SZ, default_font_sz)
        self.font_name = annotation_info.get(ANNO_TEXT_FONT, default_font_name)


class ImageContent:
    def __init__(self, annotation_info, value):
        self.type = "image"
        self.page_idx = annotation_info.get(ANNO_PAGE_IDX, 0)

        if not value:
            self.image_data = None
        else:
            self.image_data = value

        self.x, self.y = annotation_info.get(ANNO_IMAGE_POS)[:2]
        self.width, self.height = annotation_info.get(ANNO_IMAGE_SZ, default_img_sz)[:2]


class CheckboxContent:
    def __init__(self, annotation_info, value):
        # print(u'\u2713') : "✓"
        self.type = annotation_info.get(ANNO_TYPE, "checkbox1")
        self.page_idx = annotation_info.get(ANNO_PAGE_IDX, 0)

        if not value:
            self.value = None
        else:
            if self.type == "checkbox1":
                self.value = u'\u2713'
            else:
                self.value = 'X'

        self.x, self.y = annotation_info.get(ANNO_CHB_POS)[:2]
        self.sz = annotation_info.get(ANNO_CHB_SZ, default_chb_sz)

        self.color = default_font_color
        self.font_name = default_font_name
