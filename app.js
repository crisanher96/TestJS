function app() {
  pjs.import('js/servicesGoAny')
  pjs.defineDisplay("display", "app.json")
  mensaje=''
  while (true) {
    //Cuando Se oprime el boton load
    if(actualizarsolicitudes){
      let response = JSON.parse(services_GoAny('/cargueDatos', '-'))
      //display.tablaUsuarios.clear()
       display.solicitudes_grid.clear()
      for (var i = 0; i < response.users.length; i++) {
        display.solicitudes_grid.addRecords([{
          solicitud: response.users[i].numIdent,
          nombre: response.users[i].nameUser,
          documento: response.users[i].lastNameUser,
          estado: "activo",
        }])
      }
    }

    //Cuando se oprime el boton aprobar o rechazar
    if (currentRecord != 0){
      registroSel = display.tablaUsuarios.getRecord(currentRecord)
      
      if (btnAprobar) {
        mensaje='Se aprobo el registro '+currentRecord+' Usuario: '+registroSel.numIdent+' '+registroSel.nameUser+' '+registroSel.lastNameUser
      }

      if (btnRechazar){
        mensaje='Se Rechazo el registro '+currentRecord+' Usuario: '+registroSel.numIdent+' '+registroSel.nameUser+' '+registroSel.lastNameUser
      }
    }
    display.principal.execute()
  }
}

exports.default = app;