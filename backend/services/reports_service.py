"""
-- IGNORE --
Input formats : PDF, CSV, DOCX
Output formats : Key Findings Summary, Full Report, Presentation Slides or Charts
Targeted Users : Doctors, Surgeons, Medical Researchers
"""
import pdfplumber
from docx import Document
import pandas as pd
import os

class TextExtractionService:
    def __init__(self, file_path):
        self.file_path = file_path

    def extract_pdf(self):
        print("Extracting text from PDF...")
        text = ""
        with pdfplumber.open(self.file_path) as pdf:
            for page in pdf.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text + "\n"
        return text

    def extract_docx(self):
        print("Extracting text from DOCX...")
        text = ""
        doc = Document(self.file_path)
        for para in doc.paragraphs:
            text += para.text + "\n"
        return text

    def extract_csv(self):
        print("Extracting text from CSV...")
        df = pd.read_csv(self.file_path)
        return df.to_string(index=False)

    def extract_text(self):
        ext = os.path.splitext(self.file_path)[1].lower()
        if ext == ".pdf":
            return self.extract_pdf()
        elif ext == ".docx":
            return self.extract_docx()
        elif ext == ".csv":
            return self.extract_csv()
        else:
            raise ValueError("Unsupported file type. Please provide PDF, DOCX, or CSV.")

if __name__ == "__main__":
    # Example usage
    file_path = r"C:/Users/Rayyan/Downloads/Untitled document (8) (1).pdf"  # Change to your file path
    extractor = TextExtractionService(file_path)
    extracted_text = extractor.extract_text()
    print(extracted_text)