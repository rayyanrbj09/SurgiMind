from backend.services.reports_service import ReportExtractor
from models.reports.summary import Summarizer

pdf_path = r"C:/Users/Rayyan/Downloads/Untitled document (7).pdf"

report = ReportExtractor(pdf_path)
extracted_content = report.extract_all()

summarizer = Summarizer()
final_summary = summarizer.summarize(extracted_content)
print("Final Summary:\n", final_summary)