from prompts import get_completion

def get_summary(res):
    prompt=f"Generate summary in 2000 words for {res} topic"
    summary=get_completion(prompt)
    print(summary)
    return summary