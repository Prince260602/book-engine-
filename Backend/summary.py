from gemini_api import initialize_gemini

# Function to get summary using Gemini API
def get_summary(res):
    prompt = f"Generate a 2000-word summary for the topic: {res}"
    model = initialize_gemini()
    response = model.generate_content(prompt)
    print("response from gemini: summary", response.text)
    return response.text

# Example usage
# topic = "Artificial Intelligence in Healthcare"
# get_summary(topic)
