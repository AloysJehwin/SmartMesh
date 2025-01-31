# SmartMesh - Zigbee Mesh-Based Smart Home Automation

## 🚀 Overview
**SmartMesh** is a smart home automation system that utilizes a **Zigbee mesh network** for seamless communication between smart devices and sensors. A **central hub** acts as the primary controller, while a **mobile app** connects via **Bluetooth Low Energy (BLE)** to provide real-time visualization and management of the network.

## 🌟 Features
- ✅ **Zigbee Mesh Network** – Reliable and scalable device-to-device communication.
- ✅ **Central Hub** – Manages and controls all Zigbee devices efficiently.
- ✅ **BLE Mobile App** – Real-time monitoring and remote control.
- ✅ **Automation & Scheduling** – Create custom automation rules for smart devices.
- ✅ **Security & Encryption** – Secure data transmission with encrypted communication.
- ✅ **Energy Efficiency** – Optimized for low power consumption.

## 🔧 Tech Stack
- **Hardware:** ESP32 / Raspberry Pi (Central Hub), Zigbee Modules (CC2531/Zigbee2MQTT)
- **Protocols:** Zigbee, BLE, MQTT
- **Software:** Python (Backend), React Native (Mobile App), Node.js (API)

## 📜 Architecture
1. **Zigbee Devices** – Sensors, lights, locks, etc., communicate in a mesh network.
2. **Central Hub** – Manages the Zigbee network and connects to the mobile app via BLE.
3. **Mobile App** – Provides real-time control and visualization.
4. **Cloud/MQTT Broker (Optional)** – For remote access and advanced automation.

## 🚀 Installation & Setup
### **Prerequisites**
- Raspberry Pi / ESP32 with Zigbee module
- Zigbee-enabled devices
- BLE-supported mobile phone

### **1️⃣ Setting Up the Central Hub**
```sh
# Clone the repository
git clone https://github.com/your-username/SmartMesh.git
cd SmartMesh
```

### **4️⃣ Connecting the Mobile App**
- Install the **SmartMesh Mobile App** (React Native-based).
- Enable BLE on your phone.
- Connect to the hub and start controlling your devices!

---
🚀 **SmartMesh - The Future of Seamless Smart Home Automation!**
