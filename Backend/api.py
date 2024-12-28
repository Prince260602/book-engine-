# from typing import Union
# from fastapi import FastAPI
# from pydantic import BaseModel
# from prompts import get_completion
# from name import get_name
# from intro import get_intro
# from content import generate_content
# from chapters import generate_chapters
# from summary import get_summary
# from fastapi.middleware.cors import CORSMiddleware
# app = FastAPI()

# origins = [
#    "*"
# ]

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins,
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# @app.get("/health")
# def read_root():
#     return {"success": "the api is working"}

# @app.get("/get_genre_name/{genre_name}")
# def addname(genre_name: str):
#     # return {"genre_name": genre_name}
#     prompt = f"Generate 5 unique ebook titles for {genre_name}"
#     print("genre name", prompt)
#     ebook_titles=get_name(genre_name)
#     # result=update_item(genre_name,content)
#     return {"ebook_titles": ebook_titles}

# #contents api
# class contents(BaseModel):
#     ebook_name: str
#     chap_nos: int
#     subno: int

# @app.put("/get_content")
# def update_item(content: contents):

#     contents_resp=generate_content(content.ebook_name,content.chap_nos,content.subno)
#     print("contents response ",contents_resp)
#     print(type(contents_resp))
#     output_structure = []
#     lines = contents_resp.splitlines()

#     for line in lines:
#         if line.startswith("Chapter"):
#             current_chapter = int(line.split(":")[0].split()[-1])
#             current_subsection = 0
#             chapter_name = line.split(":")[1].strip()
#             output_structure.append([current_chapter, "chapter", f"Chapter {current_chapter}: {chapter_name}"])
#         elif line.startswith("   "):
#             current_subsection += 1
#             subsection_name = line.strip()
#             output_structure.append([current_chapter, "subsection", f"{subsection_name}"])

#     print(output_structure)
#     return {"contents": output_structure}

# class NameInput(BaseModel):
#     name: str

# @app.put("/gen_intro")
# def gen_intro(name_input: NameInput):
#     name = name_input.name
#     intro=get_intro(name)
#     return {"introduction": intro}

# @app.put("/gen_chapters")
# def gen_chapters(content: contents):
#     chapters_resp=generate_chapters(content.ebook_name,content.chap_nos,content.subno)
#     return {"chapters": chapters_resp}

# @app.put("/gen_summary")
# def gen_summary(name_input: NameInput):
#     name = name_input.name
#     summary=get_summary(name)
#     return {"summary": summary}



from typing import Union
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from prompts import get_completion
from name import get_name
from intro import get_intro
from content import generate_content
from chapters import generate_chapters
from summary import get_summary
from fastapi.middleware.cors import CORSMiddleware
import logging
import openai

# Set your API key
openai.api_key = "your-api-key"

# Make an API call
response = openai.Completion.create(
    engine="text-davinci-003",
    prompt="Hello, world!",
    max_tokens=5
)

# Print the response
print(response)

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

@app.get("/health", summary="Health Check", description="Check if the API is running.")
def read_root():
    logger.info("Health check requested.")
    return {"success": "the api is working"}

@app.get("/get_genre_name/{genre_name}")
def get_ebook_titles(genre_name: str):
    try:
        prompt = f"Generate 5 unique ebook titles for {genre_name}"
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
