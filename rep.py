import paho.mqtt.client as mqtt 
import time
import RPi.GPIO as GPIO
import datetime
GPIO.setmode(GPIO.BOARD)
GPIO.setup (32, GPIO.IN)
GPIO.setup (33, GPIO.IN)
GPIO.setup (7, GPIO.OUT)
GPIO.setup (11, GPIO.OUT)
f=open("sensor.txt","w")


def on_message(client, obj, msg):    
	mensaje=(msg.payload.decode("utf-8"))
	print(mensaje)

mqttc = mqtt.Client() 
mqttc.on_message = on_message 
mqttc.username_pw_set("crisandresveloz@hotmail.com","2609931duq") 
mqttc.connect("maqiatto.com", 1883) 
mqttc.subscribe("crisandresveloz@hotmail.com/test1", 0)

rc=0
print("Inicio de conexion")
i = 0
while rc == 0:
	time.sleep(2)
	rc = mqttc.loop()
	i =i+1
	Fyh=datetime.datetime.now().strftime('D: %d, M: %m, A: %Y, H: %H, Min: %M, Seg: %S')
	if GPIO.input(32) and GPIO.input(33):
		GPIO.output(7, True)
		GPIO.output(7, True)
		men=("Sensor1 y sensor 2 Activado")
		print(men)
		f.write(Fyh  +men +"\n")
		print(fyh)
		time.sleep(1)
	elif GPIO.input(32):
		GPIO.output(7, True)
		men=("Sensor1 Activado")
		print(men)
		f.write(Fyh  +men +"\n")
		time.sleep(1)
	elif GPIO.input(33):
		GPIO.output(11, True)
		men=("Sensor 2 Activado")
		print(men)
		f.write(Fyh  +men +"\n")
		time.sleep(1)
	else:
		GPIO.output(11, False)
		GPIO.output(7, False)
		print("ningun sensor activado")
		time.sleep(1)
