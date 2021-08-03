import os
import json

from server.libs.form.pdf_mangement import PdfManagement
from server.libs.form.contents import TextContent, ImageContent, CheckboxContent
from server.settings import REF_DIR, TMP_DIR
from server.utils.logger import get_logger


templates_dir = os.path.join(REF_DIR, "templates")
docs_dir = os.path.join(templates_dir, "docs")
jsons_dir = os.path.join(templates_dir, "jsons")


class PacketManagement:
    def __init__(self):
        pass
        self.logger = get_logger(label="PACKET")

    @staticmethod
    def create_packet_document(request_body):
        """
        :param request_body:
        :return:
        """
        pages = []
        for form_data in request_body["forms"]:
            json_anno_file = os.path.join(jsons_dir, f"{form_data['form_id']}.json")
            if not os.path.exists(json_anno_file):
                continue
            with open(json_anno_file) as jp:
                annotation_data = json.load(jp)

            template_doc_file = os.path.join(docs_dir, annotation_data["doc"])
            if not os.path.exists(template_doc_file):
                continue

            page_manager = PdfManagement(template_file=template_doc_file)
            page_contents = []

            for field_id in form_data["fields"].keys():
                if field_id not in annotation_data["fields"].keys():

                    continue

                field_type = form_data['fields'][field_id]['type']
                field_value = form_data['fields'][field_id].get("value", None)
                annotation_info = annotation_data["fields"][field_id]

                content = None
                if field_type == 'text':
                    content = TextContent(annotation_info=annotation_info, value=field_value)
                elif field_type == 'image':
                    content = ImageContent(annotation_info=annotation_info, value=field_value)
                elif field_type.startswith("checkbox"):
                    content = CheckboxContent(annotation_info=annotation_info, value=field_value)

                if content is not None:
                    page_contents.append(content)

            pages.extend(page_manager.add_contents(page_contents))

        output_file = os.path.join(TMP_DIR, f"{request_body['packet_type']}.pdf")
        PdfManagement().save(pages=pages, output_file=output_file)


if __name__ == '__main__':
    test_request = json.load(open(os.path.join(TMP_DIR, "test.json")))
    PacketManagement().create_packet_document(request_body=test_request)
