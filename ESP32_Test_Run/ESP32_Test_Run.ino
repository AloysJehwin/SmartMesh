#include <WiFi.h>
#include <MySQL_Connector_Arduino.h>

// WiFi Credentials
const char *ssid = "Hotspot";
const char *password = "your_wifi_password"; // Update your password

// MySQL Server Credentials
const char *server_addr = "192.168.1.100";  // Change this to your MySQL server IP
const char *user = "esp32";
const char *password_db = "yourpassword";

WiFiClient client;
MySQL_Connector_Arduino conn(client);

void setup() {
    Serial.begin(115200);
    WiFi.begin(ssid, password);

    Serial.print("Connecting to WiFi...");
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }
    Serial.println("\nConnected to WiFi");

    Serial.print("Connecting to MySQL...");
    if (conn.connect(server_addr, 3306, user, password_db)) {
        Serial.println("Connected!");
    } else {
        Serial.println("Connection Failed! Check database credentials & network.");
    }
}

void loop() {
    if (conn.connected()) {
        Serial.println("Inserting data...");
        MySQL_Cursor *cur = new MySQL_Cursor(&conn);
        cur->execute("INSERT INTO testdb.sensor_data (value) VALUES (25.6)");
        Serial.println("Data Inserted Successfully!");
        delete cur;
    } else {
        Serial.println("Reconnecting to MySQL...");
        conn.connect(server_addr, 3306, user, password_db);
    }
    delay(5000);
}
