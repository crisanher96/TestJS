 process.env.NODE_TLS_REJECT_UNAUTHORIZED='0'
//process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 1
pjs.import('../config.js')

function services_GoAny(endPoint,motivo,bodyF,username,password) {
  console.log("entro serviceGoany")
  console.log(bodyF)
  console.log(motivo)


  // constante con objeto json de parametros de conexion.
  const paramConexion = paramConfig(username,password)
  console.log("parametros de loggeo")
  console.log(username)
  console.log(password)
  console.log("FIN...")

  // var url="https://64.76.190.188:443/rest/forms/v1/UtilidadesPjsSIFA/payload"
  //var url = `${paramConexion.urlGoanywhere}/rest/forms/v1/pjs-chernandez/payload`
  var url = `${paramConexion.urlGoanywhere}/rest/forms/v1/apiweb/payload`  
  console.log(url)
  console.log('#########Enviando Peticion a Servicio Web: '+endPoint)
  let body1=bodyF.toString().substring(0,1000)  
  console.log(body1)
  let body2=motivo.toString().substring(0,1000).substring(0,1000)
  console.log(body2)
  // let body3=bodyF.toString().substring(2000,3000)
  // let body4=bodyF.toString().substring(3000,4000)
  // let body5=bodyF.toString().substring(4000,5000)

  // parametros para realizar el consumo
  const options = {
    method: "GET",
    url: url,
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
  console.log(payloadId)
  //Consumo Form por Post 
  var urlPOST = `${paramConexion.urlGoanywhere}/rest/forms/v1/apiweb/payload/${payloadId}/submit`
  var body = pjs.sendRequest({
    method: "POST",
    uri: urlPOST,
    'auth': {
      'user': username,
      'pass': password,
      'sendImmediately': false
    },
    body: {
      "endPoint" : endPoint.toString(),
      "body" : body1.toString(),
      "body2" : body2.toString()
      // "body3" : body3.toString(),
      // "body4" : body4.toString(),
      // "body5" : body5.toString()
    },
    json: true,
    timeout: 500000,
    time: true
  })

  response = body.data.message
  return response.toString()                    
}
exports.services_GoAny = services_GoAny