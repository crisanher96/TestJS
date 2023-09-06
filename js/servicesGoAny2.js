 process.env.NODE_TLS_REJECT_UNAUTHORIZED='0'
//process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 1
pjs.import('../config.js')

pjs.defineDisplay("display", "vista_1.json");
const fs = require('fs');
//const delay = require('delay');


function services_GoAny2(endPoint,motivo,bodyF,username,password) {
  console.log("entro serviceGoany2")
  console.log(bodyF)
  


  // constante con objeto json de parametros de conexion.
  const paramConexion = paramConfig(username,password)
  console.log("parametros de loggeo")
  console.log(username)
  console.log(password)
  console.log("FIN...")

  // var url="https://64.76.190.188:443/rest/forms/v1/UtilidadesPjsSIFA/payload"
  //var url = `${paramConexion.urlGoanywhere}/rest/forms/v1/pjs-chernandez/payload`
  var url = `${paramConexion.urlGoanywhere}/rest/forms/v1/cargue/payload`  
  console.log(url)
  console.log('#########Enviando Peticion a Servicio Web: '+endPoint)
  let body1=bodyF.toString().substring(0,1000)  
  console.log(body1)


 //prueba con request de postman
                    var request = require('request');

                     // parametros para realizar el consumo
                    const options = {
                      method: "GET",
                      url: 'https://200.7.213.94:443/rest/forms/v1/cargue/payload',
                      'auth': {
                        'user': username,
                        'pass': password,
                         'sendImmediately': false
                      }
                    }

                    //Obtencion Payload
                    console.log(options)
                    console.log("-- comienza peticion --")
                    let response = pjs.sendRequest(options)
                    console.log(response)
                    var payloadId = response.data.payloadId.toString()
                    console.log("AQUI ESTA EL PAYLOAD")
                    //var fs = require('fs');
                    url_post = `https://200.7.213.94:443/rest/forms/v1/cargue/payload/${payloadId}/file`
                    var options2 = {
                      'method': 'POST',
                      'url': url_post,
                       'auth': {
                        'user': "alexis.chamorro",
                        'pass': "W8890iSy",
                        'sendImmediately': false
                      },
                      // 'headers': {
                      //   'Authorization': 'Basic YWxleGlzLmNoYW1vcnJvOlc4ODkwaVN5'
                      // },
                      formData: {
                        'archivo': {
                        'value': fs.createReadStream('/usr/src/pjsrun/modules/wsfiles/Archivo_servi_ranking.pdf'),
                        'options': {
                        'filename': '/usr/src/pjsrun/modules/wsfiles/Archivo_servi_ranking.pdf',
                        'contentType': null
                          }
                        }
                      }
                    };
                    request(options2, function (error, responsess) {
                      if (error) throw new Error(error);
                      //console.log(response.body);
                      //console.log("xxxxxxx")
                    });

              //creado delay    
              


          //fin de delay
                    ////////////////////////////////////////
                    console.log("fin consumo servicio cargue archivo")
                    //salidaa = response.data.message
////////////------------------
//falta agregar el boton ya que no esta realizando el proceso en serie
            //ok
              visibleLoading = "hidden"
              display.console.execute();
              if(okdos){
                    //var urlPOST = `${paramConexion.urlGoanywhere}/rest/forms/v1/apiweb/payload/${payloadId}/submit`
                    var urlPOST = `https://200.7.213.94:443/rest/forms/v1/cargue/payload/${payloadId}/submit`
                    var bodys = pjs.sendRequest({
                      method: "POST",
                      uri: urlPOST,
                      'auth': {
                        'user': username,
                        'pass': password,
                        //'sendImmediately': false
                      },
                      body: {
                        "endpoint" : endPoint.toString(),
                        "body"     : body1.toString()
                      
                      },
                      json: true,
                      timeout: 50000,
                      time: true
                    })
             }

/////////////////////----------------
                     
// fin prueba con request de postman
//
                       
//


 response = bodys.data.message
 return response.toString()        
   
}
exports.services_GoAny2 = services_GoAny2