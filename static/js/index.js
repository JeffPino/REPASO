//https://www.eclipse.org/paho/clients/js/

function imprimir() {
	X=document.getElementById("contra").value;
	console.log(X)
	message = new Paho.MQTT.Message(X);
    message.destinationName = "cinthyaanabel14@gmail.com/raspberry";
    client.send(message);
  
}
function nuevac(){	
	X=document.getElementById("contra").value;
	console.log(X)
	message = new Paho.MQTT.Message("nueva " +X);
    message.destinationName = "cinthyaanabel14@gmail.com/raspberry";
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
    userName: "cinthyaanabel14@gmail.com",
    password: "embebidos1",
    onSuccess:onConnect,
    onFailure:doFail
  }

  // connect the client
  client.connect(options);
   
  // called when the client connects
  function onConnect() {
    // Once a connection has been made, make a subscription and send a message.
    console.log("Conectado...");
	
    client.subscribe("cinthyaanabel14@gmail.com/servidor");
    message = new Paho.MQTT.Message("hola desde la web");
    message.destinationName = "cinthyaanabel14@gmail.com/raspberry";
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
  }
  
