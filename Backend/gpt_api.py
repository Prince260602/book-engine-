import json
import csv
import openai

with open('key.json', 'r') as key:
    
    data = json.load(key)
api_key = data['test_key']
openai.api_key = api_key

def chatgpt(role, question):
    messages = [
        { 'role': 'system', 'content': role },
        { 'role': 'user', 'content': question }
    ] 
    response = openai.ChatCompletion.create(
        model = 'gpt-3.5-turbo',
        messages = messages
    )
    return str(response['choices'][0]['message']['content'])


csv_file_path = './topics.csv'
output_file_path = './output.md'

with open(csv_file_path, 'r', newline='') as csv_file, open(output_file_path, 'a') as output_file:

    role = 'Generate ebook'

    reader = csv.reader(csv_file)
    index = data['topics_so_far'] + 1

    # Iterate through each row in the csv file (i.e. each word)
    for row in reader:
        question = str(row[0])
        response = chatgpt(role, question)

        output_file.write(f'**{index}. {question}**\n\n')
        output_file.write(response + '\n')
        output_file.write('<hr>\n\n')
        index += 1

    new_data = {
        'test_key': data['test_key'],
        'topics_so_far': 0
    }
    with open('key.json', 'w') as json_file:
        json.dump(new_data, json_file, indent=4)
