const int button = 9;

void setup() {
  Serial.begin(9600);
  pinMode(button, INPUT_PULLUP);
}

void loop() {
  int data = digitalRead(button);
  
  if (data == LOW) {
    Serial.println("a");  
  }

  if (data == HIGH) {
    Serial.println("b");  
  }
}
