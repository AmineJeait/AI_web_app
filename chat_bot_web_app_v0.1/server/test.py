import requests
from flask import Flask,request,jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
import re
import ast

# Import the necessary module

# Load environment variables from the .env file (if present)
load_dotenv()

def overwrite_env_key(key, value, file_path=".env"):
    with open(file_path, "r") as f:
        lines = f.readlines()

    with open(file_path, "w") as f:
        for line in lines:
            if line.strip().startswith(f"{key}="):
                f.write(f"{key}={value}\n")
            else:
                f.write(line)


# Example usage





# Access environment variables as if they came from the actual environment


# # Example usage
# print(f'SECRET_KEY: {URL}')



app = Flask(__name__)

url = "https://577765d34466.ngrok-free.app/message"
CORS(app, origins=["http://localhost:5173"])


# NGROK_URL = {
#     "url":""
# }

@app.route('/ngrok',methods = ['POST'])
def get_url():
    user_input = request.get_json()
    overwrite_env_key("NGROK_URL", str(user_input['URL']))
    

    return jsonify( {"status":"ok"})




@app.route('/',methods = ['POST'])
def proxy():
    data = {
        "message": ""
    }

    userinput = request.get_json()
    data["message"] = userinput
    print(userinput)
    response = requests.post(url,json=userinput)

    print(response.status_code)  # Check if it's 200
    print(response)         # See what the server actually returned

    if response.status_code == 200:
        try:
            data = response.json()
            print(data)
        except ValueError:
            print("Response is not valid JSON.")
    else:
        print(f"Error: Status code {response.status_code}")


    return jsonify(data)
# Your Flask endpoint URL


# Sample data to send


# Send POST request with JSON data




@app.route('/messages', methods=['POST'])
def store_chat():
    messages = request.get_json()

    print(messages)
    if not messages:
        return jsonify({"error": "No messages provided"}), 400

    # Write each session as one line
    with open('messages.txt', 'w') as f:
        print("Logging to messages.txt:", messages)
        f.write(str(messages) + "\n")

    return jsonify({"status": "messages stored"})



@app.route('/getMessages', methods=['GET', 'POST'])
def get_messages():
    try:
        with open("messages.txt", "r") as f:
            content = f.read()
    except FileNotFoundError:
        return jsonify({"reply": []})  # No messages yet

    # Find all message blocks using regex
    pattern = r"\{'messages': \[.*?\]\}"
    matches = re.findall(pattern, content)

    all_messages = []

    for raw in matches:
        try:
            parsed = ast.literal_eval(raw)  # safely convert string to dict
            msgs = parsed.get("messages", [])
            all_messages.extend(msgs)
        except Exception as e:
            print(f"Skipping bad entry: {e}")
            continue

    return jsonify({"reply": all_messages})




if __name__ == '__main__':
    app.run(debug=True)


