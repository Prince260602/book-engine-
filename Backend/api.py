from typing import Union
from fastapi import FastAPI
from pydantic import BaseModel
from prompts import get_completion
from name import get_name
from intro import get_intro
from content import generate_content
from chapters import generate_chapters
from summary import get_summary
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()

origins = [
   "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def read_root():
    return {"success": "the api is working"}

@app.get("/get_genre_name/{genre_name}")
def addname(genre_name: str):
    # return {"genre_name": genre_name}
    prompt = f"Generate 5 unique ebook titles for {genre_name}"
    print("genre name", prompt)
    ebook_titles=get_name(genre_name)
    # result=update_item(genre_name,content)
    return {"ebook_titles": ebook_titles}

#contents api
class contents(BaseModel):
    ebook_name: str
    chap_nos: int
    subno: int

@app.put("/get_content")
def update_item(content: contents):

    contents_resp=generate_content(content.ebook_name,content.chap_nos,content.subno)
    print("contents response ",contents_resp)
    print(type(contents_resp))
    output_structure = []
    lines = contents_resp.splitlines()

    for line in lines:
        if line.startswith("Chapter"):
            current_chapter = int(line.split(":")[0].split()[-1])
            current_subsection = 0
            chapter_name = line.split(":")[1].strip()
            output_structure.append([current_chapter, "chapter", f"Chapter {current_chapter}: {chapter_name}"])
        elif line.startswith("   "):
            current_subsection += 1
            subsection_name = line.strip()
            output_structure.append([current_chapter, "subsection", f"{subsection_name}"])

    print(output_structure)
    return {"contents": output_structure}

class NameInput(BaseModel):
    name: str

@app.put("/gen_intro")
def gen_intro(name_input: NameInput):
    name = name_input.name
    intro=get_intro(name)
    return {"introduction": intro}

@app.put("/gen_chapters")
def gen_chapters(content: contents):
    chapters_resp=generate_chapters(content.ebook_name,content.chap_nos,content.subno)
    return {"chapters": chapters_resp}

@app.put("/gen_summary")
def gen_summary(name_input: NameInput):
    name = name_input.name
    summary=get_summary(name)
    return {"summary": summary}