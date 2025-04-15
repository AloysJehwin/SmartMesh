from flask import Flask, jsonify
from flask_cors import CORS
import random
from datetime import datetime

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# State of 3 bulbs
bulb_states = {
    "1": False,
    "2": False,
    "3": False
}

@app.route('/bulb-status', methods=['GET'])
def get_all_bulb_status():
    return jsonify({
        "statuses": bulb_states
    })

@app.route('/light/<bulb_id>/<action>', methods=['POST'])
def control_light(bulb_id, action):
    if bulb_id not in bulb_states:
        return jsonify({"error": "Invalid bulb ID"}), 404

    if action == 'on':
        bulb_states[bulb_id] = True
    elif action == 'off':
        bulb_states[bulb_id] = False
    else:
        return jsonify({"error": "Invalid action"}), 400

    return jsonify({"bulb_id": bulb_id, "status": "on" if bulb_states[bulb_id] else "off"})

@app.route('/sensor-data', methods=['GET'])
def get_sensor_data():
    # Random values between 0 and 1 if the bulb is ON, else 0.0
    sensor_data = {
        "appliance1": round(random.uniform(0, 1), 3) if bulb_states["1"] else 0.0,
        "appliance2": round(random.uniform(0, 1), 3) if bulb_states["2"] else 0.0,
        "appliance3": round(random.uniform(0, 1), 3) if bulb_states["3"] else 0.0,
        "status": {
            "appliance1": bulb_states["1"],
            "appliance2": bulb_states["2"],
            "appliance3": bulb_states["3"]
        },
        "timestamp": datetime.utcnow().isoformat()
    }
    return jsonify(sensor_data)

@app.route('/', methods=['GET'])
def home():
    return "Hello from Flask"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
