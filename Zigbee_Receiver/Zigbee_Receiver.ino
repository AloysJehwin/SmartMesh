const int led=13;
void setup(){
  Serial.begin(9600);
  pinMode(led,OUTPUT);
}
void loop(){
  char data=Serial.read();
  if(data=='a'){
    digitalWrite(led,HIGH);
  }
  if(data=='b'){
    digitalWrite(led,LOW);
  }
}
