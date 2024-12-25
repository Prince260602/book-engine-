from prompts import get_completion
# from content import generate_content

output_file_path = './output.md'
def generate_chapters(name,chno, subno):
    chapters=[]
    print("in chapters")
    for i in range(1,chno+1):
        for j in range(1,subno+1):
            prompt=f"please generate contents on {name} ebook chapter {i} subsection {i}.{j} in detailed 500 words"
            result=get_completion(prompt)
            print("result in chapters.py ",result)
            chapters.append(result)
            # with open(output_file_path, 'a') as output_file:
                # chapters.append(result)
            #     output_file.write(result + '\n')
            #     output_file.write('<hr>\n\n')
    return chapters
import re

def convert_text_to_format(text):
    chapters = []
    current_chapter = []

    lines = text
    print("lines ",lines)
    for line in lines:
        # line=line.split("\n")
        for text in line:
            # text=text.split("\n")

            # print("inside line loop ",text)
            if line.startswith("Chapter"):
                
                if current_chapter:
                    chapters.append(current_chapter)
                    
                current_chapter = [{"id": 1 , "type": "chapter", "data": line.strip()}]
            elif line.startswith("Subsection"):
                current_chapter.append({"id": line.split(":")[0].strip(), "type": "subtitle", "data": line.strip()})
            elif line.strip():
                current_chapter.append({"id": str(len(current_chapter) + 1), "type": "data", "data": line.strip()})

        if current_chapter:
            chapters.append(current_chapter)

    return chapters

# Example usage with the provided text
# text = generate_chapters("Whispers in the Shadows",1, 1)
# print("text=== ",text)
# formatted_chapters = convert_text_to_format(text)

# Print the formatted chapters
# for chapter in formatted_chapters:
#     print("formated chapter ",chapter)

