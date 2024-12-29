from prompts import get_completion
from chapters import generate_chapters
import logging

# Initialize logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

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
        # Formulate the prompt
        prompt = f"Please generate the list of contents of {name}, containing {chno} chapters, each having {subno} subsections."
        logger.info(f"Prompt generated: {prompt}")

        # Get completion from the model
        response = get_completion(prompt)
        logger.info("Generated table of contents successfully.")
        return response

    except Exception as e:
        logger.error(f"Error generating content for {name}: {e}")
        return None

if __name__ == "__main__":
    # Example usage
    ebook_name = "Whispers in the Shadows"
    chapter_count = 3
    subsection_count = 2

    logger.info("Starting content generation...")
    content_list = generate_content(ebook_name, chapter_count, subsection_count)
    if content_list:
        logger.info("Generated Content List:")
        print(content_list)

    # Optionally, generate full chapter content based on the table of contents
    chapters = generate_chapters(ebook_name, chapter_count, subsection_count)
    logger.info("Generated Chapter Content:")
    for chapter in chapters:
        print(chapter)
