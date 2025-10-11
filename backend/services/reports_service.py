"""
-- IGNORE --
Input formats : PDF, CSV, DOCX - Contains {text, tables, images}
Output formats : Key Findings Summary, Full Report, Presentation Slides or Charts
Targeted Users : Doctors, Surgeons, Medical Researchers
"""

import pdfplumber
import pytesseract
from PIL import Image
from pdf2image import convert_from_path
import io

class ReportExtractor:
    def __init__(self, pdf_path):
        self.pdf_path = pdf_path
        self.text = ""
        self.ocr_text = ""
        self.tables = []

    def extract_text(self):
        try:
            with pdfplumber.open(self.pdf_path) as pdf:
                for page in pdf.pages:
                    page_text = page.extract_text()
                    if page_text:
                        self.text += page_text + "\n"
        except Exception as e:
            print(f"[ERROR] Text extraction failed: {e}")

    def extract_tables(self):
        try:
            with pdfplumber.open(self.pdf_path) as pdf:
                for page in pdf.pages:
                    page_tables = page.extract_tables()
                    for table in page_tables:
                        table_str = "\n".join([", ".join(row) for row in table])
                        self.tables.append(table_str)
        except Exception as e:
            print(f"[ERROR] Table extraction failed: {e}")

    def extract_images_text(self):
        try:
            images = convert_from_path(self.pdf_path, dpi=300)
            for i, image in enumerate(images):
                text = pytesseract.image_to_string(image)
                if text.strip():
                    self.ocr_text += f"\n[Page {i+1} OCR]\n{text}"
        except Exception as e:
            print(f"[ERROR] OCR extraction failed: {e}")

    def extract_all(self):
        self.extract_text()
        self.extract_tables()
        self.extract_images_text()

        combined = (
            f"--- TEXT EXTRACTED ---\n{self.text}\n"
            f"--- OCR EXTRACTED ---\n{self.ocr_text}\n"
            f"--- TABLES ---\n{''.join(self.tables)}"
        )
        return combined
