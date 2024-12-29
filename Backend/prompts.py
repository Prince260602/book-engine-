from gemini_api import initialize_gemini

# Function to interact with the Gemini API
def get_completion(prompt):
    model = initialize_gemini()
    response = model.generate_content(prompt)
    print("response from gemini: prompts", response.text)
    return response.text

# Example usage
# prompt = "Generate 5 unique ebook titles for science fiction"
# titles = get_completion(prompt)
# print(titles)
