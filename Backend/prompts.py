import openai
import re
from dotenv import load_dotenv
import os

# Load the treasure map
load_dotenv()

# Read the clues (environment variables)
model = os.getenv("GPT_MODEL")
openai.api_key  = os.getenv("API_KEY")


def get_completion(prompt, model='gpt-3.5-turbo'):
    messages = [{"role": "user", "content": prompt}]
    response = openai.ChatCompletion.create(
        model=model,
        messages=messages,
        temperature=0, # this is the degree of randomness of the model's output
        
    )
    
    res=response.choices[0].message["content"]
    return response.choices[0].message["content"]