const multer = require('multer');
const fs=require("fs");
const path = require('path');
 

const baseDirectoryPath = './assure/';
const upload1 = multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb,) {

        console.log("hell",req.app.locals.path);
        let restPath=req.app.locals.path;
             let fullPath = baseDirectoryPath+ '/'+restPath.id_assure+'/'+restPath.id_recours;
             if (!fs.existsSync(fullPath)) {
                fs.mkdirSync(fullPath, { recursive: true });
              }
             if (file.fieldname === 'file1') {
            // get extension     
          const fileExtension = path.extname(file.originalname);
           file.originalname="recours"+fileExtension;
           
              } else if (file.fieldname === 'file2') {
                 // get extension  
                const secondFileExtension = path.extname(file.originalname);
                file.originalname="decision_commission"+secondFileExtension;
              }
        // Check if the directory already exists, if not, create it
       
        
        cb(null, fullPath); 
  
      },
      filename: function (req, file, cb) {
        cb(null, file.originalname);
      }
    })
  });
  
 
  module.exports = upload1; 