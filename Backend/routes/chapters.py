from fastapi import APIRouter
from pydantic import BaseModel
from chapters import generate_chapters
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

class Contents(BaseModel):
    ebook_name: str
    chap_nos: int
    subno: int

@router.post("/", summary="Generate Chapters", description="Generate chapters for an ebook.")
def generate_ebook_chapters(content: Contents):
    logger.info(f"Generating chapters for ebook: {content.ebook_name}")
    chapters_resp = generate_chapters(content.ebook_name, content.chap_nos, content.subno)
    return {"chapters": chapters_resp}
