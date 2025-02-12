#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <SoftwareSerial.h>

SoftwareSerial XBee(2, 3);  // (RX, TX) for Zigbee communication
LiquidCrystal_I2C lcd(0x27, 16, 2);  // Change 0x27 to 0x3F if needed

void setup() {
    lcd.init();
    lcd.backlight();
    lcd.setCursor(0, 0);
    lcd.print("Waiting Data...");
    
    XBee.begin(9600);
    Serial.begin(9600);
}

void loop() {
    if (XBee.available()) {
        String receivedData = XBee.readStringUntil('\n');  // Read until newline
        
        Serial.print("Received: ");
        Serial.println(receivedData);

        lcd.clear();
        lcd.setCursor(0, 0);
        lcd.print("WCS1600 Data:");
        lcd.setCursor(0, 1);
        lcd.print(receivedData);
    }
}
