from prompts import get_completion
def get_intro(name):
    prompt=f"Generate introduction page for {name}"
    intro=get_completion(prompt)
    print("intro ==== ",intro)
    return intro


from prompts import get_completion
import logging

# Initialize logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

def generate_intro(name):
    """
    Generate an introduction page for a given name using the Gemini protocol.

    Args:
        name (str): The name or topic for which the introduction is to be generated.

    Returns:
        str: The generated introduction content.
    """
    try:
        # Create the prompt for the Gemini model
        prompt = f"Generate introduction page for {name}"
        logger.info(f"Prompt generated: {prompt}")

        # Get the completion using Gemini's get_completion method
        intro = get_completion(prompt)
        logger.info(f"Introduction generated successfully for {name}")
        
        # Print and return the introduction
        print("Intro === ", intro)
        return intro

    except Exception as e:
        logger.error(f"Error generating introduction for {name}: {e}")
        return f"Error: Unable to generate introduction for {name}"

# Example usage
if __name__ == "__main__":
    # Example name to generate introduction
    name = "Gemini Protocols"
    logger.info(f"Generating introduction for {name}...")
    intro_content = generate_intro(name)
    logger.info("Process completed.")
