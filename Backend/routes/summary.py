from fastapi import APIRouter
from pydantic import BaseModel
from summary import get_summary
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

class NameInput(BaseModel):
    name: str

@router.post("/", summary="Generate Summary", description="Generate a summary for an ebook.")
def generate_summary(name_input: NameInput):
    logger.info(f"Generating summary for name: {name_input.name}")
    summary = get_summary(name_input.name)
    return {"summary": summary}
