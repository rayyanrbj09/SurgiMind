"""
--- IGNORE ---
Input formats : PDF, CSV, DOCX
1. A prompt template consists of a string template. 
It accepts a set of parameters from the user that can be used to generate a prompt for a language model.
2. Chains encode a sequence of calls to components like models, document retrievers, other Chains, etc., and provide a simple interface to this sequence.
3. LLM classes provide access to the large language model (LLM) APIs and services.

"""
from PIL  import Image
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from langchain.llms import OpenAI

llm = OpenAI(temperature=0.7) 

# Define a prompt template
prompt = PromptTemplate(
    input_variables=["text"],
    template="Summarize the following medical report text into key findings:\n\n{text}\n\nKey Findings Summary:",
)

chain = LLMChain(llm=llm, prompt=prompt)
summary = chain.run("Your medical report text goes here.")
print(summary)