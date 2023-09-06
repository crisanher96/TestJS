/* 

  Profound UI File Upload Widget Exit Program

  Provides security for file uploads, see here:

  http://www.profoundlogic.com/docs/display/PUI/Security

*/

const path = require("path");
const fs = require('fs');

function puiuplexit(fileInfo, allow, errorMsg) {

  pjs.define("fileInfo", { type: 'data structure', qualified: true, refParm: fileInfo, elements: {
    "widgetId": { type: 'char', length: 256 },
    "directory": { type: 'char', length: 256 },
    "name": { type: 'char', length: 256 },
    "type": { type: 'char', length: 256 },
    "size": { type: 'unsigned integer' },
    "exists": { type: 'boolean' }
  }});
  pjs.define("allow", { type: 'integer', length: 5, decimals: 0, refParm: allow });
  pjs.define("errorMsg", { type: 'char', length: 256, refParm: errorMsg });

  
  // For example...

  // 1. Allow file size up to 10MB...

  // 2. Allow writing files only into the files directory.

  var pjsfiles = __dirname + path.sep + "files";


  console.log(fileInfo.widgetId)
  console.log(allow)
  console.log(fileInfo.name)

  ///usr/src/pjsrun/modules/wsfiles/files
  console.log(pjsfiles);
  console.log("entro al cargue")
  console.log(fileInfo.size)
  console.log(fileInfo.directory)
  console.log(fileInfo.directory.rtrim())
  console.log(pjsfiles)

  
  //if (fileInfo.size <= 10485760 && (fileInfo.directory).rtrim() == pjsfiles){
  if (fileInfo.size <= 10485760){  
      console.log("entro al if cargue")
    allow = 1;}
  else {
    console.log("entro al else cargue")
    allow = 0;}

  

  // Read the file into a buffer
  let ruta = `${fileInfo.directory.toString().trim()}/${fileInfo.name.toString().trim()}`
    
  console.log(ruta)
 

        
        // function findFilesInDir(dir) {
        //   const files = [];

        //   // Read the contents of the directory
        //   const items = fs.readdirSync(dir);

        //   for (const item of items) {
        //     // Construct the full path of the item
        //     const itemPath = path.join(dir, item);

        //     // Get the stat object for the item
        //     const stat = fs.statSync(itemPath);

        //     if (stat.isDirectory()) {
        //       // Recursively search the subdirectory
        //       const subFiles = findFilesInDir(itemPath);
        //       files.push(...subFiles);
        //     } else if (stat.isFile()) {
        //       // Add the file to the list
        //       files.push(itemPath);
        //     }
        //   }

        //   return files;
        // }
        // let rut = `${fileInfo.directory.toString().trim()}/files`
        // console.log(rut)
        // const files = findFilesInDir(rut);
        // console.log(files[0]);







  //const fileBuffer = fs.readFileSync('/usr/src/pjsrun/modules/wsfiles/ARCHIVO DE PRUEBA.pdf');

  // // Convert the buffer to base64
 // const base64String = fileBuffer.toString('base64');

   //console.log(base64String);


  
}

exports.default = puiuplexit;
