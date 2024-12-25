from name import get_name
from content import generate_content
from intro import get_intro
from chapters import generate_chapters
from summary import get_summary

genre="romance"
# titles=get_name(genre)
# print(titles)
# titles = [line.strip().split('"')[1] for line in titles.strip().split('\n')]
# user_choice = int(input("Enter the number which title you want to select"))
# index=user_choice
# if 1 <= index <= len(titles):
#     name = titles[index - 1]
    # print(f"Selected title: {name}")
# contents=generate_content("The Enchanted Kiss: A Love Story Beyond Time", 2,2)
# print(contents)
# intro=gen_intro("The Enchanted Kiss: A Love Story Beyond Time")
# print(intro)
# chapters=generate_chapters(",1,2)
# print(chapters)
summary=gen_summary("The Enchanted Kiss: A Love Story Beyond Time")
print(summary)