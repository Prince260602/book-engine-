from gemini_api import initialize_gemini

def get_name(genre):
    prompt = f"Generate 5 unique ebook titles for {genre}"
    model = initialize_gemini()
    response = model.generate_content(prompt)
    print("response from gemini: name", response.text)
    return response.text

# Example usage
# genre = "Science Fiction"
# titles = get_name(genre)
# print(titles)
