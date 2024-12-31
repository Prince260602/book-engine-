from prompts import get_completion
from chapters import generate_chapters
import logging, json

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def validate_inputs(name, chno, subno):
    """Validate the inputs for generating content."""
    if not isinstance(name, str) or not name.strip():
        raise ValueError("eBook name must be a non-empty string.")
    if not isinstance(chno, int) or chno <= 0:
        raise ValueError("Number of chapters must be a positive integer.")
    if not isinstance(subno, int) or subno < 0:
        raise ValueError("Number of subsections must be a non-negative integer.")

def generate_content(name, chno, subno):
    """
    Generate the table of contents for an eBook with given chapters and subsections.

    Args:
        name (str): Name of the eBook.
        chno (int): Number of chapters.
        subno (int): Number of subsections per chapter.

    Returns:
        str: A list of contents generated for the eBook.
    """
    try:
        validate_inputs(name, chno, subno)
        prompt = f"Please generate the list of contents of {name}, containing {chno} chapters, each having {subno} subsections."
        logger.info(f"Prompt generated: {prompt}")

        response = get_completion(prompt)
        logger.info("Generated table of contents successfully.")
        return response

    except ValueError as ve:
        logger.error(f"Validation Error: {ve}")
        return None
    except Exception as e:
        logger.error(f"Error generating content for {name}: {e}")
        return None

if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description="Generate eBook contents and chapters.")
    parser.add_argument("--name", type=str, required=True, help="Name of the eBook")
    parser.add_argument("--chno", type=int, required=True, help="Number of chapters")
    parser.add_argument("--subno", type=int, default=0, help="Number of subsections per chapter")

    args = parser.parse_args()

    try:
        logger.info("Starting content generation...")
        content_list = generate_content(args.name, args.chno, args.subno)
        if content_list:
            logger.info("Generated Content List:")
            print(content_list)

        chapters = generate_chapters(args.name, args.chno, args.subno)
        logger.info("Generated Chapter Content:")
        for chapter in chapters:
            print(chapter)
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
