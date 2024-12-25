from prompts import get_completion
from chapters import generate_chapters
def generate_content(name,chno,subno):
    # chno=int(input("enter how many chapters"))

    prompt=f"please generate the list of contents of  {name} containing {chno} chapters, having {subno} subsections"
    print("prompt=",prompt)
    res=get_completion(prompt)
    return res
    # generate_chapters(res,chno)
    print("results im content ",res)