from prompts import get_completion

def get_name(genre):
    prompt=f"Generate 5 unique ebook titles for {genre} "

    res=get_completion(prompt, model="gpt-3.5-turbo")
    # print("res in name ",res)
    return res
    # titles = [line.strip().split('"')[1] for line in res.strip().split('\n')]




    
    # generate_content(name)
    # gen_intro(name)
    # print("name response = ",response.choices[0].message["content"])
    # ebook_name=input("enter the name of the ebook you wish to select")
# chno=input("how many chapters you want ?")

# get_name()