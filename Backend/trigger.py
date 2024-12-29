# from name import get_name
# from content import generate_content
# from intro import get_intro
# from chapters import generate_chapters
# from summary import get_summary

# genre="romance"
# # titles=get_name(genre)
# # print(titles)
# # titles = [line.strip().split('"')[1] for line in titles.strip().split('\n')]
# # user_choice = int(input("Enter the number which title you want to select"))
# # index=user_choice
# # if 1 <= index <= len(titles):
# #     name = titles[index - 1]
#     # print(f"Selected title: {name}")
# # contents=generate_content("The Enchanted Kiss: A Love Story Beyond Time", 2,2)
# # print(contents)
# # intro=gen_intro("The Enchanted Kiss: A Love Story Beyond Time")
# # print(intro)
# # chapters=generate_chapters(",1,2)
# # print(chapters)
# summary=gen_summary("The Enchanted Kiss: A Love Story Beyond Time")
# print(summary)


from name import get_name
from content import generate_content
from intro import get_intro
from chapters import generate_chapters
from summary import get_summary

def trigger(genre="romance"):
    try:
        # Fetch ebook titles for the given genre
        titles = get_name(genre)
        print(f"Available Titles for '{genre}' genre:")
        print(titles)
        
        # Split titles and present a list to the user
        titles_list = [line.strip().split('"')[1] for line in titles.strip().split('\n')]
        
        # Simulating user choice (hardcoded for testing)
        user_choice = 1  # Example: selecting the first title
        if 1 <= user_choice <= len(titles_list):
            selected_title = titles_list[user_choice - 1]
            print(f"Selected title: {selected_title}")
        else:
            print("Invalid choice. Exiting.")
            return
        
        # Generate content, introduction, and chapters based on the selected title
        contents = generate_content(selected_title, 2, 2)  # Example: custom params
        print(f"Generated content for {selected_title}:")
        print(contents)
        
        intro = get_intro(selected_title)
        print(f"Generated intro for {selected_title}:")
        print(intro)
        
        chapters = generate_chapters(selected_title, 1, 2)  # Example: custom params
        print(f"Generated chapters for {selected_title}:")
        print(chapters)
        
        # Generate summary
        summary = get_summary(selected_title)
        print(f"Generated summary for {selected_title}:")
        print(summary)

    except Exception as e:
        print(f"Error occurred: {str(e)}")

# Simulate triggering from Gemini protocol
if __name__ == "__main__":
    trigger()
