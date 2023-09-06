function vista_1(username,password){
  pjs.import('js/servicesGoAny')
  pjs.import('js/servicesGoAny2')
  pjs.import('download')  
  pjs.import('puiuplexit')
  const fs = require('fs');
  var FormData = require('form-data');
  const pdf2base64 = require('pdf-to-base64');
  pjs.defineDisplay("display", "vista_1.json");

  while(!closesesion)
  {
    console.log("entro vista_1")
       //Cuando Se oprime el boton actualizar solicitudes
    function cargar(){
      console.log("actualiza tabla de solicitudes")
      let response = JSON.parse(services_GoAny('/cargueDatos','-','-',username.value,password.value))
      console.log("respuesta")
      //display.tablaUsuarios.clear()
       display.solicitudes_grid.clear()
      for (var i = 0; i < response.solicitudes.length; i++) {
        display.solicitudes_grid.addRecords([{
          solicitud: response.solicitudes[i].idsolicitud,
          monto: response.solicitudes[i].monto,
          documento: response.solicitudes[i].solicitante,
          estado: response.solicitudes[i].estado,
        }])
      }
    }

    if(actualizarsolicitudes == true){
        cargar();
    }

    // monitoreo botones enviar - rechazar 
    if (currentRecord != 0){
      console.log("entro currentRecord")
      registroSel = display.solicitudes_grid.getRecord(currentRecord)
      console.log("seleccionado  *************")
      console.log(registroSel.solicitud)
      console.log("**********************")


      if(importar.toString().trim() != '000'){
        console.log(importar.toString().trim());
        console.log("importar archivo ")
        //const fileStream = fs.createReadStream('/usr/src/pjsrun/modules/wsfiles/ARCHIVO DE PRUEBA2.pdf');
        //formData.append('file', fileStream);
         salida = carga;
         let response = (services_GoAny2('/cargueDocumento','-',registroSel.documento,username.value,password.value))

         console.log(response)

        //Eliminar el archivo del directorio
        try {
          fs.unlinkSync('/usr/src/pjsrun/modules/wsfiles/Archivo_servi_ranking.pdf')
          console.log('File removed')
        } catch(err) {
          console.error('Something wrong happened removing the file', err)
        }

        console.log("salio");
         cargar();
         //crear 2 vistas para consultar el estado de las solicitudes por analista y por supervisor de credito

      }
      
      if (rechazar) {
        //mensaje='Se aprobo el registro '+currentRecord+' Usuario: '+registroSel.numIdent+' '+registroSel.nameUser+' '+registroSel.lastNameUser
        //let response_2 = JSON.parse(services_GoAny('/rechazarSolicitud', registroSel.solicitud,username.value,password.value))
        let motivo = "NO CUMPLE CON LOS REQUISITOS MINIMOS"
        let response_2 = JSON.parse(services_GoAny('/rechazarSolicitud', motivo,registroSel.solicitud,username.value,password.value))        
       // let response_2 = services_GoAny('/rechazarSolicitud',motivo,registroSel.solicitud,username.value,password.value)
         cargar();
      }
      if(enviar){
         let response_4 = services_GoAny('/enviarSolicitud', '-',registroSel.solicitud,username.value,password.value)
         console.log(response_4)
         cargar();
      }
      
      // if (btnRechazar){
      //   mensaje='Se Rechazo el registro '+currentRecord+' Usuario: '+registroSel.numIdent+' '+registroSel.nameUser+' '+registroSel.lastNameUser
      // }
    }
      if(rechazar2){
        let solicitud = solicitud2
        let motivo = motivo2
        let response_2 = services_GoAny('/rechazarSolicitud',motivo,solicitud,username.value,password.value)
        solicitud2="";
        motivo2="";
        cargar();
      }

    if(enviar2){
      let solicitu = solicitud3
      let motiv = motivo3
      let response_2 = services_GoAny('/enviarSolicitud',motiv,solicitu,username.value,password.value)
      solicitud3="";
      motivo3="";
      cargar();
    }
   // fin monitoreo botones enviar - rechazar
        display.vista_1.execute();
  }

}

exports.run = vista_1;