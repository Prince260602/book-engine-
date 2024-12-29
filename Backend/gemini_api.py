import logging
import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

# Initialize logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

def initialize_gemini(gemini_model=os.getenv("GEMINI_MODEL")):
    gemini_api_key = os.getenv("GEMINI_API_KEY")  # API Key for Gemini
    print("helloworld", gemini_api_key)
    genai.configure(api_key=gemini_api_key)
    model = genai.GenerativeModel(gemini_model)
    return model
