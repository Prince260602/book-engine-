from prompts import get_completion
import logging

# Output file for debugging or storing generated content
OUTPUT_FILE_PATH = './output.md'

# Initialize logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def generate_chapters(name, chno, subno):
    """
    Generate detailed content for chapters and subsections of an ebook.
    
    Args:
        name (str): Name of the ebook.
        chno (int): Number of chapters to generate.
        subno (int): Number of subsections per chapter.

    Returns:
        list: A list of generated chapter contents.
    """
    chapters = []
    logger.info("Generating chapters...")
    
    for i in range(1, chno + 1):
        for j in range(1, subno + 1):
            prompt = f"Please generate contents on {name} ebook Chapter {i} Subsection {i}.{j} in detailed 500 words."
            try:
                result = get_completion(prompt)
                logger.info(f"Generated content for Chapter {i}, Subsection {i}.{j}")
                chapters.append(result)
            except Exception as e:
                logger.error(f"Error generating content for Chapter {i}, Subsection {i}.{j}: {e}")
    
    return chapters

def convert_text_to_format(text):
    """
    Convert generated chapter content into a structured format.
    
    Args:
        text (list): List of chapter content strings.

    Returns:
        list: A structured list of chapters with subsections and their respective data.
    """
    chapters = []
    current_chapter = []
    chapter_id = 1

    logger.info("Converting text to structured format...")

    for line in text:
        # Handle each line in the chapter content
        lines = line.split("\n")  # Split content by new lines for parsing
        for subline in lines:
            if subline.startswith("Chapter"):
                # Start a new chapter
                if current_chapter:
                    chapters.append(current_chapter)
                current_chapter = [{"id": chapter_id, "type": "chapter", "data": subline.strip()}]
                chapter_id += 1
            elif subline.startswith("Subsection"):
                # Add a new subsection to the current chapter
                subsection_id = f"{chapter_id}.{len(current_chapter)}"
                current_chapter.append({"id": subsection_id, "type": "subtitle", "data": subline.strip()})
            elif subline.strip():
                # Add regular data content to the chapter
                data_id = f"{chapter_id}.{len(current_chapter)}"
                current_chapter.append({"id": data_id, "type": "data", "data": subline.strip()})

    # Append the last chapter if it exists
    if current_chapter:
        chapters.append(current_chapter)

    logger.info("Conversion to structured format completed.")
    return chapters

# Example Usage
if __name__ == "__main__":
    # Example input: Generating chapters and converting them into a structured format
    ebook_name = "Whispers in the Shadows"
    chapter_count = 2
    subsection_count = 2

    # Generate chapters
    generated_text = generate_chapters(ebook_name, chapter_count, subsection_count)
    logger.info(f"Generated text: {generated_text}")

    # Convert to structured format
    formatted_chapters = convert_text_to_format(generated_text)
    logger.info("Formatted Chapters:")
    for chapter in formatted_chapters:
        logger.info(chapter)
