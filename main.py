from reports_service import ReportExtractor
from summary import Summarizer

# =========================
# SUMMARY GENERATION FUNCTION


def generate_summary(pdf_path: str) -> str:
    """
    Extracts content from a PDF and returns its summary
    """
    report = ReportExtractor(pdf_path)
    extracted_content = report.extract_all()

    summarizer = Summarizer()
    final_summary = summarizer.summarize(extracted_content)


    return final_summary
