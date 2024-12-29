from fastapi import APIRouter, HTTPException
from name import get_name
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

@router.get("/{genre_name}", summary="Get Ebook Titles", description="Generate ebook titles based on genre.")
def get_ebook_titles(genre_name: str):
    try:
        logger.info(f"Generating ebook titles for genre: {genre_name}")
        ebook_titles = get_name(genre_name)
        return {"ebook_titles": ebook_titles}
    except Exception as e:
        logger.error(f"Error generating titles for genre '{genre_name}': {e}")
        raise HTTPException(status_code=500, detail="Error generating ebook titles.")
