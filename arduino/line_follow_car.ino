#include <ArduinoJson.h>

bool state = false;
//sensors
int SensorLeft = 3;  //IR obstacle detect Sensor
int SensorRight = 11; 
int val_leftSensor ;
int val_rightSensor ;

//Right motor
int rightMotorPin1=5;
int rightMotorPin2=6;

//Left motor
int leftMotorPin1=9;
int leftMotorPin2=10;



void setup() 
{
  Serial.begin(9600);
  pinMode(SensorLeft, INPUT); 
  pinMode(SensorRight, INPUT); 
  
  pinMode(rightMotorPin1, OUTPUT);              //right_clockwise
  pinMode(rightMotorPin2, OUTPUT);              //right_counterclock
  pinMode(leftMotorPin1, OUTPUT);              //left_clcok
  pinMode(leftMotorPin2, OUTPUT);            //left_counterclcok
}

//time
double total_time = 0;
double total_time_set = millis();
double total_time_end ;


void loop() {
if(state == true)
{  
  total_time_end = millis();
  total_time = (total_time_end - total_time_set) / 1000;
  val_leftSensor = digitalRead(SensorLeft); // detected: 0  , undetected : 1
  val_rightSensor = digitalRead(SensorRight);
  // Serial.print("val_leftSensor: ");    
  // Serial.println(val_leftSensor);
  // Serial.print("val_rightSensor: ");
  // Serial.println(val_rightSensor);


  //If none of the sensors detects black line, then go straight
  if (val_rightSensor == 0 && val_leftSensor == 0)
  {
    rotateMotor(150,0,150,0);
  }
  //If right sensor detects black line, then turn left
  else if (val_rightSensor == 1 && val_leftSensor == 0 )
  {
      rotateMotor(0,0,150,0); 
  }
  //If left sensor detects black line, then turn right  
  else if (val_rightSensor == 0 && val_leftSensor == 1 )
  {
      rotateMotor(150,0,0,0); 
  } 
  //If both the sensors detect black line, then stop 
  else 
  {
      rotateMotor(0,0,0,0); 
  }
}

//manual car control
// DCmotor - analog control.... and range (0~255) equals (0~5)V 
if(Serial.available()> 0)
{
  String input = Serial.readString();
  // Serial.println(input);

if(input =="s"){
   analogWrite(rightMotorPin1, 150);
  analogWrite(rightMotorPin2, 0);
  analogWrite(leftMotorPin1, 150);
  analogWrite(leftMotorPin2, 0);
  Serial.println("start");
}
if(input =="sp1"){
   analogWrite(rightMotorPin1, 200);
  analogWrite(rightMotorPin2, 0);
  analogWrite(leftMotorPin1, 200);
  analogWrite(leftMotorPin2, 0);
  Serial.println("speed1");
}
if(input =="sp2"){
   analogWrite(rightMotorPin1, 255);
  analogWrite(rightMotorPin2, 0);
  analogWrite(leftMotorPin1, 255);
  analogWrite(leftMotorPin2, 0);
  Serial.println("speed2");
}
if(input == "l"){
 analogWrite(rightMotorPin1, 0);
  analogWrite(rightMotorPin2, 0);
  analogWrite(leftMotorPin1, 255);
  analogWrite(leftMotorPin2, 0);
  Serial.println("left");
}
if(input == "r"){
  analogWrite(rightMotorPin1, 255);
  analogWrite(rightMotorPin2, 0);
  analogWrite(leftMotorPin1, 0);
  analogWrite(leftMotorPin2, 0);
  Serial.println("right");
}
if(input == "p"){
  analogWrite(rightMotorPin1, 0);
  analogWrite(rightMotorPin2, 0);
  analogWrite(leftMotorPin1, 0);
  analogWrite(leftMotorPin2, 0);
  Serial.println("stop");
}
if(input == "re"){
  analogWrite(rightMotorPin1, 0);
  analogWrite(rightMotorPin2, 255);
  analogWrite(leftMotorPin1, 0);
  analogWrite(leftMotorPin2, 255);
  Serial.println("backward");
}
if(input == "track"){
  total_time_set = millis();
  state = !state;
  if(state == false)
  {  
  rotateMotor(0,0,0,0);
  // Serial.println("track off");
  // Serial.print("state change , status: ");
  // Serial.println(state);
  // Serial.print("total time: ");
  // Serial.print(total_time);

  String strS = "{\"data\":[";
  String str1 = "{\"type\":\"total_time\"";
  String str2 = ",\"value\":\"";
  String str3 = String(total_time);
  String str4 = "\"}]}";
  Serial.print(strS+str1+str2+str3+str4);
}
}




}
}




// function -> defines motor's rotate direction. 
void rotateMotor(int R_Mo_Pin1_Val,int R_Mo_Pin2_Val, int L_Mo_Pin1_Val,int L_Mo_Pin2_Val)
{
   analogWrite(rightMotorPin1, R_Mo_Pin1_Val);
  analogWrite(rightMotorPin2, R_Mo_Pin2_Val);
  analogWrite(leftMotorPin1, L_Mo_Pin1_Val);
  analogWrite(leftMotorPin2, L_Mo_Pin2_Val);  
}