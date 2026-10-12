import json
import os
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

DATA_FILE = os.path.join(os.path.dirname(__file__), 'contacts.json')


def load_contacts():
    if not os.path.exists(DATA_FILE):
        return []

    try:
        with open(DATA_FILE, 'r', encoding='utf-8') as file:
            data = json.load(file)
            return data if isinstance(data, list) else []
    except (json.JSONDecodeError, OSError):
        return []


def save_contacts(contacts):
    with open(DATA_FILE, 'w', encoding='utf-8') as file:
        json.dump(contacts, file, indent=2)


@app.get('/api/health')
def health():
    return jsonify({"status": "ok"})


@app.get('/api/contacts')
def get_contacts():
    return jsonify(load_contacts())


@app.post('/api/contact')
def contact():
    payload = request.get_json(silent=True) or {}
    name = f"{payload.get('firstName', '').strip()} {payload.get('lastName', '').strip()}".strip()
    email = payload.get('email', '').strip()
    subject = payload.get('subject', '').strip()
    message = payload.get('message', '').strip()

    if not name or not email or not message:
        return jsonify({"message": "Please fill in your name, email, and message."}), 400

    contacts = load_contacts()
    entry = {
        "name": name,
        "email": email,
        "phone": payload.get("phone", "").strip(),
        "company": payload.get("company", "").strip(),
        "website": payload.get("website", "").strip(),
        "projectType": payload.get("projectType", "").strip(),
        "budget": payload.get("budget", "").strip(),
        "timeline": payload.get("timeline", "").strip(),
        "preferredContact": payload.get("preferredContact", "").strip(),
        "location": payload.get("location", "").strip(),
        "referralSource": payload.get("referralSource", "").strip(),
        "subject": subject or "No subject",
        "message": message,
    }
    contacts.append(entry)
    save_contacts(contacts)

    return jsonify({
        "message": "Thank you! Your message has been received.",
        "data": entry,
    })


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
