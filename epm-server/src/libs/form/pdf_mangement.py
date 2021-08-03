import io
import re
from base64 import b64decode
# noinspection PyProtectedMember
from PyPDF2 import PdfFileWriter, PdfFileReader
from PIL import Image
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.lib.colors import pink, black, red, blue, white, HexColor
from reportlab.pdfbase import pdfform
# from reportlab.lib.fonts import *
from server.libs.form.contents import TextContent, CheckboxContent, ImageContent

# PAGE_W = 612  # 8.5 inch
PAGE_H = 792  # 11 inch


class PdfManagement:
    template_pdf = None
    _pages = []

    def __init__(self, template_file=None, output_file=None):
        # read your existing PDF
        if template_file is not None:
            _input_stream = open(template_file, "rb")
            self.template_pdf = PdfFileReader(_input_stream)
            self._pages = [page for page in self.template_pdf.pages]

        if output_file is not None:
            self._output_file = output_file

    def add_text(self, text_obj: TextContent, page_idx=0):
        """
        :param text_obj:
        :param page_idx:
        :return:
        """
        if text_obj.text is None:
            return
        # create a new PDF with Reportlab
        packet = io.BytesIO()
        # create a new PDF with Reportlab
        can = canvas.Canvas(packet, pagesize=letter)
        can.setFont(text_obj.font_name, text_obj.font_sz)
        can.setStrokeColor(HexColor(text_obj.font_color))
        can.drawString(float(text_obj.x)*inch, PAGE_H - float(text_obj.y)*inch, text_obj.text)
        can.save()

        # move to the beginning of the StringIO buffer
        packet.seek(0)
        tmp_pdf = PdfFileReader(packet)

        self._pages[page_idx].mergePage(tmp_pdf.getPage(0))

    def modify_checkbox(self, chb_obj: CheckboxContent, page_idx=0):
        if chb_obj.value is None:
            return
        packet = io.BytesIO()

        can = canvas.Canvas(packet, pagesize=letter)
        can.setStrokeColor(HexColor(chb_obj.color))
        can.setFont(chb_obj.font_name, chb_obj.sz)
        can.drawString(float(chb_obj.x)*inch, PAGE_H - float(chb_obj.y)*inch, chb_obj.value)
        can.save()

        # move to the beginning of the StringIO buffer
        packet.seek(0)
        tmp_pdf = PdfFileReader(packet)

        self._pages[page_idx].mergePage(tmp_pdf.getPage(0))

    def add_signature(self, signature_obj: ImageContent, page_idx=0):
        if signature_obj.image_data is None:
            return

        packet = io.BytesIO()
        # create a new PDF with Reportlab
        can = canvas.Canvas(packet, pagesize=letter)

        # getting base64 string from canvas image data
        image_b64_data = re.search('base64,(.*)', signature_obj.image_data).group(1)
        image_b64_data = b64decode(image_b64_data)  # decoding base64 string
        image_bytes = io.BytesIO(image_b64_data)  # converting data to bytes
        image = Image.open(image_bytes)  # making it a PIL Image as ReportLab supports PIL Image writing

        # Now write the image in the canvas of PDF using ReportLab
        can.drawInlineImage(image,
                            float(signature_obj.x) * inch, float(PAGE_H - signature_obj.y) * inch,
                            float(signature_obj.width) * inch, float(signature_obj.height) * inch)
        can.save()

        packet.seek(0)
        tmp_pdf = PdfFileReader(packet)

        self._pages[page_idx].mergePage(tmp_pdf.getPage(0))

    def add_contents(self, contents):
        for content in contents:
            if content.type == "text":
                self.add_text(content)
            elif content.type.startswith("checkbox"):
                self.modify_checkbox(content)
            elif content.type == "signature":
                self.add_signature(content)

        return self._pages

    def save(self, pages=None, output_file=None):
        # finally, write "output" to a real file
        output_pdf = PdfFileWriter()
        if pages is None:
            for page in self._pages:
                output_pdf.addPage(page)
        elif isinstance(pages, list):
            for page in pages:
                output_pdf.addPage(page)

        if output_file is None:
            with open(self._output_file, "wb") as _output_stream:
                output_pdf.write(_output_stream)
        else:
            with open(output_file, "wb") as _output_stream:
                output_pdf.write(_output_stream)
