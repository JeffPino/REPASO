import paho.mqtt.client as mqtt 
import time
import RPi.GPIO as GPIO
import datetime

def siempre():
	print("Envio datos")
	if GPIO.input(20):
		GPIO.output(4, True)
		men=("Sensor1 Activado")
		mqttc.publish("cinthyaanabel14@gmail.com/servidor", "S1 activo")
		print(men)
		f.write(Fechahora  +men +"\n")
	if GPIO.input(21):
		GPIO.output(5, True)
		men=("Sensor2 Activado")
		print(men)
		f.write(Fechahora  +men +"\n")
		mqttc.publish("cinthyaanabel14@gmail.com/servidor", "S2 activo")
	else:
		GPIO.output(4, False)
		GPIO.output(5, False)
		mqttc.publish("cinthyaanabel14@gmail.com/servidor", "S12 desactivado")


def cnueva(clave):
	global nueva
	nueva=clave
	f.write(nueva)



def on_message(client, obj, msg):    
	o=(msg.payload.decode("utf-8")).split(" ")[0]
	clave=(msg.payload.decode("utf-8")).split(" ")[1]
	print(o)
	print(clave)
	if o=="n":
		cnueva(clave)
	else: 
		print("Buscando")
		lines = f.readlines()
		for line in lines:
			palabras = line.split(' ')
			for p in palabras:
				if p=="clave":
					siempre()
	


GPIO.setmode(GPIO.BCM)
GPIO.setup (20, GPIO.IN)
GPIO.setup (21, GPIO.IN)
GPIO.setup (4, GPIO.OUT)
GPIO.setup (5, GPIO.OUT)
f=open("sensor.txt","w")
mqttc = mqtt.Client() 
mqttc.on_message = on_message 
mqttc.username_pw_set("cinthyaanabel14@gmail.com","embebidos1") 
mqttc.connect("maqiatto.com", 1883) 
mqttc.subscribe("cinthyaanabel14@gmail.com/raspberry", 0)

rc=0
print("Inicio de conexion")
i = 0
while rc == 0:
	time.sleep(1)
	rc = mqttc.loop()
	Fechahora=datetime.datetime.now().strftime('%d-%m-%Y     %H:%M:%S    ')
	if GPIO.input(20):
		GPIO.output(4, True)
		men=("Sensor1 Activado")
		f.write(Fechahora  +men +"\n")
	elif GPIO.input(21):
		GPIO.output(5, True)
		men=("Sensor 2 Activado")
		f.write(Fechahora  +men +"\n")
	else:
		GPIO.output(4, False)
		GPIO.output(5, False)
		
		