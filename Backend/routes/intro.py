from fastapi import APIRouter
from pydantic import BaseModel
from intro import get_intro
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

class NameInput(BaseModel):
    name: str

@router.post("/", summary="Generate Introduction", description="Generate an introduction for an ebook.")
def generate_intro(name_input: NameInput):
    logger.info(f"Generating introduction for name: {name_input.name}")
    intro = get_intro(name_input.name)
    return {"introduction": intro}
