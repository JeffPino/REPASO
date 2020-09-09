//https://www.eclipse.org/paho/clients/js/

function Suma() {
	n1 = document.getElementById("numero1").value;
	n2 = document.getElementById("numero2").value;
	console.log("S " +n1+" "+n2);
	message = new Paho.MQTT.Message("S " +n1+" "+n2);
    message.destinationName = "jeffersson.pino@gmail.com/RASP";
    client.send(message);
}
function Resta() {
	n1 = document.getElementById("numero1").value;
	n2 = document.getElementById("numero2").value;
	console.log("R " +n1+" "+n2);
	message = new Paho.MQTT.Message("R " +n1+" "+n2);
    message.destinationName = "jeffersson.pino@gmail.com/RASP";
    client.send(message);
}
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
	
    client.subscribe("jeffersson.pino@gmail.com/WEB");
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
     text=(message.payloadString).split(" ")[0];
	 Resp=(message.payloadString).split(" ")[1];
	 console.log(texto)
	 if (text=="S"){
	  x=("La respuesta de la suma es:" + Resp);
	  document.getElementById("estado1").innerHTML = x;
	 }
     else if (text=="R"){
	  document.getElementById("estado1").innerHTML = x;
	  x=("La respuesta de la resta es:" + Resp);
	}

  }