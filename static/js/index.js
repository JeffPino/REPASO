//https://www.eclipse.org/paho/clients/js/

function leer() {
	pass= document.getElementById("clave").value;
	console.log(pass);
	message = new Paho.MQTT.Message("V"+pass);
    message.destinationName = "crisandresveloz@hotmail.com/test1";
    client.send(message);
	
  
}
function setpass(){	
	npass= document.getElementById("clave").value;
	console.log(pass);
	message = new Paho.MQTT.Message("C"+pass);
    message.destinationName = "crisandresveloz@hotmail.com/test1";
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
    userName: "crisandresveloz@hotmail.com",
    password: "2609931duq",
    onSuccess:onConnect,
    onFailure:doFail
  }

  // connect the client
  client.connect(options);
   
  // called when the client connects
  function onConnect() {
    // Once a connection has been made, make a subscription and send a message.
    console.log("Conectado...");
	
    client.subscribe("crisandresveloz@hotmail.com/test");
    message = new Paho.MQTT.Message("hola desde la web");
    message.destinationName = "crisandresveloz@hotmail.com/test1";
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
	con=(message.payloadString).split[0];
	stado1=(message.payloadString).split[1];
	stado2=(message.payloadString).split[2];
	if con='S'
		document.getElementById("sensor1").innerHTML=stado1;
		document.getElementById("sensor2").innerHTML=stado2;
	else
		document.getElementById("sensor1").innerHTML="Contraseña incorrecta";
		document.getElementById("sensor2").innerHTML="Contraseña incorrecta";

  }
  
