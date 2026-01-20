from reports_service import ReportExtractor
from summary import Summarizer

pdf_path = r"uploads/Untitled_document_8.pdf"

report = ReportExtractor(pdf_path)
extracted_content = report.extract_all()

summarizer = Summarizer()
final_summary = summarizer.summarize(extracted_content)
print("Final Summary:\n", final_summary)