import requests

# Your Flask endpoint URL
url = "http://127.0.0.1:5000/message"

# Sample data to send
data = {
    "message": "Hello Ollama, can you assist me?"
}

# Send POST request with JSON data
response = requests.post(url, json=data)

# Check response
if response.ok:
    print("Response JSON from Flask API:")
    print(response.json())  # This should show {"reply": "..."}
else:
    print(f"Failed with status {response.status_code}")
    print(response.text)
