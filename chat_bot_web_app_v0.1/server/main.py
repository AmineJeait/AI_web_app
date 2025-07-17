from flask import Flask, request, jsonify
from flask_cors import CORS
import ollama

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])

@app.route("/")
def hello_world():
    return "<h1>Hello world</h1>"

@app.route("/message", methods=['POST'])
def get_message():
    user_input = request.json.get("message", "")
    if not user_input:
        return jsonify({"error": "Message is required"}), 400

    messages = [{'role': 'user', 'content': user_input}]
    
    # Accumulate streamed output
    full_response = ""
    for chunk in ollama.chat(model="codegemma:7b-instruct", messages=messages, stream=True):
        if chunk.get("message") and chunk["message"].get("content"):
            full_response += chunk["message"]["content"]

    return jsonify({"reply": full_response}), 200

@app.route("/messagetest", methods=['POST'])
def get_message_test():
    user_input = request.json.get("message", "")
    if not user_input:
        return jsonify({"error": "Message is required"}), 400

    # Instead of calling ollama.chat, just return a fake reply
    fake_reply = f"You said: {user_input}. This is a mocked response."

    return jsonify({"reply": fake_reply}), 200


if __name__ == '__main__':
    app.run(debug=True)
