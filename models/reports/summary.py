"""
--- IGNORE ---
Input formats : PDF, CSV, DOCX
1. A prompt template consists of a string template. 
It accepts a set of parameters from the user that can be used to generate a prompt for a language model.
2. Chains encode a sequence of calls to components like models, document retrievers, other Chains, etc., and provide a simple interface to this sequence.
3. LLM classes provide access to the large language model (LLM) APIs and services.

"""
from transformers import pipeline

class Summarizer:
    def __init__(self, model_name="facebook/bart-large-cnn"):
        self.summarizer = pipeline("summarization", model=model_name)

    def summarize(self, text, max_length=150, min_length=30):
        if len(text.split()) == 0:
            return "No summary available for very short text."
        max_chunk = 1500
        chunks = [text[i:i + max_chunk] for i in range(0, len(text), max_chunk)]
        summary_text  = []
        for chunk in chunks:
            summary = self.summarizer(chunk, max_length=max_length, min_length=min_length, do_sample=False)
            summary_text.append(summary[0]['summary_text'])
        return " ".join(summary_text)
