//https://www.eclipse.org/paho/clients/js/

// Create a client instance
  //client = new Paho.MQTT.Client("postman.cloudmqtt.com", 14970);
  
  client = new Paho.MQTT.Client("maqiatto.com", 8883, "web_" + parseInt(Math.random() * 100, 10));

  // set callback handlers
  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;
  var options = {
   useSSL: false,
    userName: "jeffersson.pino@gmail.com",
    password: "Pepino123",
    onSuccess:onConnect,
    onFailure:doFail
  }

  // connect the client
  client.connect(options);
   
  // called when the client connects
  function onConnect() {
    // Once a connection has been made, make a subscription and send a message.
    console.log("Conectado...");
	
    client.subscribe("jeffersson.pino@gmail.com/hora");
    message = new Paho.MQTT.Message("Enlace... OK!");
    message.destinationName = "jeffersson.pino@gmail.com/RASP";
    client.send(message);
	
  }

  function doFail(e){
    console.log(e);
	
  }

  // called when the client loses its connection
  function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost:"+responseObject.errorMessage);
    }
  }

  // called when a message arrives
  function onMessageArrived(message) {
     console.log(message.payloadString);
	 actual=(message.payloadString);
     hora=(message.payloadString).split(":")[0];
	 minutos=(message.payloadString).split(":")[1];
	 segundos=(message.payloadString).split(":")[2];
	 document.getElementById("Actual").innerHTML=actual;
	 document.getElementById("Hora").innerHTML=hora;
	 document.getElementById("Minutos").innerHTML=minutos;
	 document.getElementById("Segundos").innerHTML=segundos;

	}