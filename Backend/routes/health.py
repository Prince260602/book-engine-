from fastapi import APIRouter
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

@router.get("/", summary="Health Check", description="Check if the API is running.")
def health_check():
    logger.info("Health check requested.")
    return {"success": "The API is working"}
