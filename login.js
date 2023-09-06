function login() {
  pjs.import('js/servicesGoAny') 
  pjs.defineDisplay("display", "login.json");
  
  // display.logeo.execute();

while(true){
  if(login){
    console.log("entro login__")
    console.log(username)
    console.log(password)

      var request = require('request');
      console.log("inicio prueba login")
      var url = 'https://200.7.213.94:443/rest/forms/v1/apiweb/payload'
      const options = {
                method: "GET",
                url: url,
                'auth': {
                  'user': username,
                  'pass': password
                },
                'alwaysReadBody': true,
                'json': true
              }
      let response = pjs.sendRequest(options)
        console.log(response)
        var payloadId = response.data.payloadId.toString()
        console.log(payloadId)
        console.log("**********************")

              //Consumo Form por Post 
        var urlPOST = `https://200.7.213.94:443/rest/forms/v1/apiweb/payload/${payloadId}/submit`
        var body = pjs.sendRequest({
          method: "POST",
          uri: urlPOST,
          'auth': {
            'user': username,
            'pass': password,
            'sendImmediately': false
          },
          body: {
            "endPoint" : "/Login",
            "body" : "-"
          },
          json: true,
          timeout: 500000,
          time: true
        })

        console.log("|||||||||||||||||||||||||||||||||||||")
        response = body.data.message
        //return response.toString()
        console.log(response)    
        console.log(payloadId)
        console.log("**********************")

          if (payloadId != undefined) {
              if(response == 1){
                console.log("llamar vista_1")
                pjs.call('vista_1',pjs.refParm("username"), pjs.refParm("password"))
                //pjs.defineDisplay("display2", "vista_1.json");
                //display2.vista_1.execute();
              }
              else if(response == 2){
                console.log("llamar vista_12")
                pjs.call('vista_12',pjs.refParm("username"), pjs.refParm("password"))
              }
              else if(response == 3){
                console.log("llamar vista_13")
                //pjs.defineDisplay("display2", "vista_1.json");
                pjs.call('vista_13',pjs.refParm("username"), pjs.refParm("password"))
                //display2.vista_11.execute();
              }
              else if(response == 4){
                console.log("llamar consultaSuperTienda")
                //pjs.defineDisplay("display2", "vista_1.json");
                pjs.call('consultaSuperTienda',pjs.refParm("username"), pjs.refParm("password"))
                //display2.vista_11.execute();
              }

          }
          else{
            console.log(response.body)
             console.log("entra a error yyy");
             visibleLoading = "hidden"
             display.error.execute();
          }     
      console.log("fin prueba login")
  
    
  }
  if(ok){
    username ="";
    password ="";
    display.logeo.execute();
  }
  display.logeo.execute();

  }
}
  
//exports.default = login;
exports.default = login;