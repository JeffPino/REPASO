import paho.mqtt.client as mqtt 
import time
import RPi.GPIO as GPIO
GPIO.setmode(GPIO.BCM)
GPIO.setup (18, GPIO.OUT)
GPIO.setup (27, GPIO.OUT)
def suma(a,b):
	x= (int(a)+int(b))
	print(x)
	mqttc.publish("jeffersson.pino@gmail.com/WEB", "S " +x)
	mqttc.publish("jeffersson.pino@gmail.com/WEB", "80")

def resta(a,b):
	x=(int(a)-int(b))
	print(x)
	mqttc.publish("jeffersson.pino@gmail.com/WEB", "R "+ x)


def on_message(client, obj, msg): 
	operacion=(msg.payload.decode("utf-8").split(" ")[0])
	n1=(msg.payload.decode("utf-8").split(" ")[1])
	n2=(msg.payload.decode("utf-8").split(" ")[2])
	print(msg.payload.decode("utf-8"))
	if operacion=="S":
		suma(n1,n2)
	elif operacion=="R":
		resta(n1,n2)

	
	
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