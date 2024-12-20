from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import pickle

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load the model
model_path = os.path.join(os.path.dirname(__file__), 'model', 'spam_model.pkl')
with open(model_path, 'rb') as f:
    model = pickle.load(f)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    message = data.get('message', '')
    if not message:
        return jsonify({'error': 'Message is required'}), 400

    prediction = model.predict([message])
    result = 'spam' if prediction[0] == 1 else 'ham'
    return jsonify({'message': message, 'prediction': result})

if __name__ == '__main__':
    app.run(debug=True)
