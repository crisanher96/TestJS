function vista_12(username,password){
  pjs.import('js/servicesGoAny')
  pjs.import('download')  
  pjs.import('puiuplexit')
  pjs.defineDisplay("display", "vista_1.json");
 

  
  while(!closesesion)
  {
    console.log("entro vista_12")
       //Cuando Se oprime el boton actualizar solicitudes
    function cargar(){
      console.log("actualiza tabla de solicitudes")
      let response = JSON.parse(services_GoAny('/cargueDatos','-','-',username.value,password.value))
      console.log(response.solicitudes)
      //display.tablaUsuarios.clear()
       display.solicitudes_grid_2.clear()
      for (var i = 0; i < response.solicitudes.length; i++) {
        console.log("for ciclo")
        display.solicitudes_grid_2.addRecords([{
          solicitud: response.solicitudes[i].idsolicitud,
          monto: response.solicitudes[i].monto,
          documento: response.solicitudes[i].solicitante,
          estado: response.solicitudes[i].estado,
        }])
      }
    }

      //Cuando Se oprime el boton actualizar solicitudes consulta
    function cargar2(){
      console.log("actualiza tabla de solicitudes")
      let response = JSON.parse(services_GoAny('/cargueDatosConsulta','-','-',username.value,password.value))
      console.log(response.solicitudes)
      //display.tablaUsuarios.clear()
       //display.consulta_grid.clear()
      for (var i = 0; i < response.solicitudes.length; i++) {
        console.log("for ciclo")
        display.consulta_grid.addRecords([{
          id: response.solicitudes[i].idsolicitud,
          solicitante: response.solicitudes[i].solicitante,
          analista: response.solicitudes[i].analista_nombre,
          apellido: response.solicitudes[i].analista_apellido,
          monto: response.solicitudes[i].monto,
          estado: response.solicitudes[i].estado,
          nivel: response.solicitudes[i].nivel,
          fecha_de_dolicitud: response.solicitudes[i].fecha_ini,
          tienda: response.solicitudes[i].tienda,
        }])
      }
    } 

    if(actualizarsolicitudes == true){
        cargar();
    }

    // monitoreo botones enviar - rechazar 
    if (currentRecord != 0){
      console.log("entro currentRecord")
      registroSel = display.solicitudes_grid_2.getRecord(currentRecord)
      console.log("seleccionado  *************")
      console.log(registroSel.solicitud)
      console.log("**********************")
      
      if (rechazar) {
        //mensaje='Se aprobo el registro '+currentRecord+' Usuario: '+registroSel.numIdent+' '+registroSel.nameUser+' '+registroSel.lastNameUser
        //let response_2 = JSON.parse(services_GoAny('/rechazarSolicitud', registroSel.solicitud,username.value,password.value))
        let motivo = "NO CUMPLE CON LOS REQUISITOS MINIMOS"
        let response_2 = JSON.parse(services_GoAny('/rechazarSolicitud', motivo,registroSel.solicitud,username.value,password.value))        
       // let response_2 = services_GoAny('/rechazarSolicitud',motivo,registroSel.solicitud,username.value,password.value)
       if(response_2.response != undefined){
        console.log(response_2.response)
       }
       else{
         console.log(response_2.error)
       }
        cargar();
      }

      if(enviar){
         let response_4 = services_GoAny('/enviarSolicitud', '-',registroSel.solicitud,username.value,password.value)
         console.log(response_4)
         cargar();
      }

      if(devolver){
         let response_5 = services_GoAny('/devolverSolicitud', '-',registroSel.solicitud,username.value,password.value)
         console.log(response_5)
         cargar();
      }
      
      // if (btnRechazar){
      //   mensaje='Se Rechazo el registro '+currentRecord+' Usuario: '+registroSel.numIdent+' '+registroSel.nameUser+' '+registroSel.lastNameUser
      // }
    }
    if(rechazar2){
        let solicitud = solicitud2
        let motivo = motivo2
        let response_2 = services_GoAny('/devolverSolicitud',motivo,solicitud,username.value,password.value)
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

    //nueva opcion consulta

    if(actualizarsolicitudestotal){
        // cargar2()
         console.log("actualiza tabla de solicitudes")
      let response = JSON.parse(services_GoAny('/cargueDatosConsulta','-','-',username.value,password.value))
      console.log(response.solicitudes)
      
      //display.tablaUsuarios.clear()
       display.consulta_grid.clear()
      for (var i = 0; i < response.solicitudes.length; i++) {
        nvel = response.solicitudes[i].nivel;
        if(nvel == 1){nvel = 'ANALISTA'}
        if(nvel == 2){nvel = 'SUPERVIDOR DE CREDITO'}
        if(nvel == 3){nvel = 'COMITE APROBADOR'}
        display.consulta_grid.addRecords([{
          id: response.solicitudes[i].idsolicitud,
          solicitante: response.solicitudes[i].solicitante,
          analista: response.solicitudes[i].analista_nombre ,
          apellido: response.solicitudes[i].analista_apellido,
          monto: response.solicitudes[i].monto,
          estado: response.solicitudes[i].estado,
          nivel: nvel,
          fecha_de_dolicitud: response.solicitudes[i].fecha_ini,
          tienda: response.solicitudes[i].tienda,
        }])
      }
    }

      if(closesesion){
          pjs.defineDisplay("display2", "login.json");
           username ="";
           password ="";
           display2.logeo.execute();
      }
   // fin monitoreo botones enviar - rechazar
        display.vista_12.execute();
  }

}

exports.run = vista_12;