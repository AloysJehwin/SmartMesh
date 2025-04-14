from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# State of 3 bulbs (you can simulate or integrate GPIO here)
bulb_states = {
    "1": False,
    "2": False,
    "3": False
}

# Dummy current sensor values for 3 appliances
current_sensor_readings = {
    "appliance1": 0.5,  # in Amps
    "appliance2": 1.2,
    "appliance3": 0.9
}

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
    # Here you could read real sensor data
    return jsonify(current_sensor_readings)
@app.route('/', methods=['GET'])
def home():
    return "Hello from Flask"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
