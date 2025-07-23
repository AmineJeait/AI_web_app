import requests
from flask import Flask,request,jsonify
from flask_cors import CORS



app = Flask(__name__)

url = "https://e96baf93463f.ngrok-free.app/message"
CORS(app, origins=["http://localhost:5173"])



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









if __name__ == '__main__':
    app.run(debug=True)
