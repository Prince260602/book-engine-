from prompts import get_completion
def get_intro(name):
    prompt=f"Generate introduction page for {name}"
    intro=get_completion(prompt)
    print("intro ==== ",intro)
    return intro