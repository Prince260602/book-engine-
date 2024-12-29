from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from content import generate_content
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

class Contents(BaseModel):
    ebook_name: str = Field(..., description="Name of the ebook")
    chap_nos: int = Field(..., gt=0, description="Number of chapters (must be positive)")
    subno: int = Field(..., gt=0, description="Number of subsections (must be positive)")

@router.post("/", summary="Generate Ebook Content", description="Generate content for an ebook.")
def generate_ebook_content(content: Contents):
    try:
        logger.info(f"Generating content for ebook: {content.ebook_name}")
        contents_resp = generate_content(content.ebook_name, content.chap_nos, content.subno)
        return {"contents": contents_resp}
    except Exception as e:
        logger.error(f"Error generating content: {e}")
        raise HTTPException(status_code=500, detail="Content generation failed.")
