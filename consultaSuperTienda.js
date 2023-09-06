function consultaSuperTienda(username,password){
pjs.import('js/servicesGoAny')
pjs.defineDisplay("display", "consultaSuperTienda.json");

 while(!closesesion)
  {
  
   console.log("entro vista_1")
       //Cuando Se oprime el boton actualizar solicitudes
    function cargar(){
      console.log("actualiza tabla de solicitudes")
      let response = JSON.parse(services_GoAny('/cargueDatosTienda','-','-',username.value,password.value))
      console.log("respuesta")
      //display.tablaUsuarios.clear()
       display.solicitudes_grid.clear()
      for (var i = 0; i < response.solicitudes.length; i++) {
        display.solicitudes_grid.addRecords([{
          solicitud: response.solicitudes[i].idsolicitud,
          monto: response.solicitudes[i].monto,
          documento: response.solicitudes[i].solicitante,
          estado: response.solicitudes[i].estado,
          fecha: response.solicitudes[i].fecha,
        }])
      }
    }

    if(actualizarsolicitudes == true){
        cargar();
    }
  
  
      display.consultaSuperTienda.execute();
  }
}
exports.run = consultaSuperTienda;