import paho.mqtt.client as mqtt 
import time
import RPi.GPIO as GPIO
import time
GPIO.setmode(GPIO.BCM)
GPIO.setup (18, GPIO.OUT)
GPIO.setup (27, GPIO.OUT)
def luz1o():
	 print("Luz1 encendida")
	 GPIO.output(18, True)
	 mqttc.publish("jeffersson.pino@gmail.com/WEB", "Luz1 Encendida")
def luz1n():
	 print("Luz1 apagada")
	 GPIO.output(18, False)
	 mqttc.publish("jeffersson.pino@gmail.com/WEB", "Luz1 Apagada")
def luz2o():
	 print("Luz2 encendida")
	 GPIO.output(27, True)
	 mqttc.publish("jeffersson.pino@gmail.com/WEB", "Luz2 Encendida")
def luz2n():
	 print("Luz2 apagada")
	 GPIO.output(27, False)
	 mqttc.publish("jeffersson.pino@gmail.com/WEB", "Luz2 Apagada")

def on_message(client, obj, msg): 
	accion=(msg.payload.decode("utf-8"))
	print(accion)
	if accion=="L1O":
		luz1o()
	elif accion=="L1N":
		luz1n()
	if accion=="L2O":
		luz2o()
	if accion=="L2N":
		luz2n()
	
	
mqttc = mqtt.Client() 
mqttc.on_message = on_message
mqttc.username_pw_set("jeffersson.pino@gmail.com","Pepino123") 
mqttc.connect("maqiatto.com", 1883) 
mqttc.subscribe("jeffersson.pino@gmail.com/RASP", 0)
rc=0
print("Inicio...")
i=0

while rc == 0:
	time.sleep(2)
	rc = mqttc.loop()
	i=i+1