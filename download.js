function download(filess){
  //const { writeFile } = require('fs/promises');
  //const { open} = require('fs/promises');
  //const { appendFile} = require('fs/promises');
  ///const zlib = require('zlib');
  //const https = require('https');
  var fs=require('fs')
  var Blob = require('node-blob');
  //const archiver = require('archiver');
  //const path = require('path');
  // const express = require('express')
  //aqui se creara la conversion de 64 a ZIP
  console.log("download entro")
  var chilkat = require('@chilkat/ck-node14-linux64'); //instalar chilkat segun la version de nodejs

    // Crear variable que contiene archivo base64
    const base64Data = filess;
  // creando archivo de BASE64 a ZIP
    function chilkatExample() {
        var b64 = base64Data;
        var zipData = new chilkat.BinData();
        var success = zipData.AppendEncoded(b64,"base64");
        success = zipData.WriteFile("/usr/src/pjsrun/modules/wsfiles/out.zip");
        console.log("empieza descarga")

        if (success !== true) {
            console.log("failed to write Zip file.");
            return 1;
        }else{
          return 0;
        }
    }
chilkatExample();



}
exports.download = download