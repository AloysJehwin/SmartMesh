#include <SoftwareSerial.h>

SoftwareSerial XBee(2, 3); // (RX, TX) for Zigbee communication
#define SENSOR_PIN 7  // WCS1600 sensor connected to D7

void setup() {
    pinMode(SENSOR_PIN, INPUT);
    XBee.begin(9600);  // Start Zigbee communication
    Serial.begin(9600);
}

void loop() {
    int sensorData = digitalRead(SENSOR_PIN);  // Read WCS1600 sensor (adjust if analog)
    
    XBee.print(sensorData);  // Send data over Zigbee
    XBee.print("\n");  // Send newline for parsing

    Serial.print("Sent: ");  
    Serial.println(sensorData);

    delay(1000);  // Adjust based on needs
}
