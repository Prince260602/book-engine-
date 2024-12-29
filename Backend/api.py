from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from name import get_name
from intro import get_intro
from content import generate_content
from chapters import generate_chapters
from summary import get_summary
from fastapi.middleware.cors import CORSMiddleware
import logging

logging.basicConfig(
    format='%(asctime)s - %(levelname)s - %(message)s',
    level=logging.INFO
)
logger = logging.getLogger(__name__)

app = FastAPI()

origins = [
    "http://localhost:3000", 
    "http://127.0.0.1:8000",  
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"success": "working fine!"}

@app.get("/health", summary="Health Check", description="Check if the API is running.")
def read_root():
    logger.info("Health check requested.")
    return {"success": "the api is working"}

@app.get("/get_genre_name/{genre_name}")
def get_ebook_titles(genre_name: str):
    try:
        logger.info(f"Generating ebook titles for genre: {genre_name}")
        ebook_titles = get_name(genre_name)
        return {"ebook_titles": ebook_titles}
    except Exception as e:
        logger.error(f"Error generating titles for genre '{genre_name}': {e}")
        return {"error": str(e)}

class Contents(BaseModel):
    ebook_name: str = Field(..., description="Name of the ebook")
    chap_nos: int = Field(..., gt=0, description="Number of chapters (must be positive)")
    subno: int = Field(..., gt=0, description="Number of subsections (must be positive)")


@app.post("/get_content", summary="Generate Ebook Content")
def generate_ebook_content(content: Contents):
    try:
        logger.info(f"Generating content for ebook: {content.ebook_name}")
        contents_resp = generate_content(content.ebook_name, content.chap_nos, content.subno)
        return {"contents": contents_resp}
    except Exception as e:
        logger.error(f"Error generating content: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail="Content generation failed.")

class NameInput(BaseModel):
    name: str

@app.post("/gen_intro")
def generate_intro(name_input: NameInput):
    logger.info(f"Generating introduction for name: {name_input.name}")
    intro = get_intro(name_input.name)
    return {"introduction": intro}

@app.post("/gen_chapters")
def generate_ebook_chapters(content: Contents):
    logger.info(f"Generating chapters for ebook: {content.ebook_name}")
    chapters_resp = generate_chapters(content.ebook_name, content.chap_nos, content.subno)
    return {"chapters": chapters_resp}

@app.post("/gen_summary")
def generate_summary(name_input: NameInput):
    logger.info(f"Generating summary for name: {name_input.name}")
    summary = get_summary(name_input.name)
    return {"summary": summary}
