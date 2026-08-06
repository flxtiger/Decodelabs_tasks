from flask import Flask, render_template, request, jsonify
from cipher import encrypt_text, decrypt_text

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/encrypt', methods=['POST'])
def encrypt():
    data = request.get_json()
    if not data or 'text' not in data or 'shift' not in data:
        return jsonify({'error': 'Missing text or shift parameters'}), 400
    
    try:
        text = data['text']
        shift = int(data['shift'])
        result = encrypt_text(text, shift)
        return jsonify({'result': result})
    except ValueError:
        return jsonify({'error': 'Shift must be a valid integer'}), 400

@app.route('/api/decrypt', methods=['POST'])
def decrypt():
    data = request.get_json()
    if not data or 'text' not in data or 'shift' not in data:
        return jsonify({'error': 'Missing text or shift parameters'}), 400
    
    try:
        text = data['text']
        shift = int(data['shift'])
        result = decrypt_text(text, shift)
        return jsonify({'result': result})
    except ValueError:
        return jsonify({'error': 'Shift must be a valid integer'}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5000)
