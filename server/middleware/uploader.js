const multer = require('multer');
const fs=require("fs");
const path = require('path');
//  
 
 
const baseDirectoryPath = './assure/';
const upload1 = multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb,) {
        // console.log("first",i)
  
        let restPath=req.app.locals.path;
        // console.log("first",req.files)
             let fullPath = baseDirectoryPath+ '/assure_'+restPath.id_assure+'/recours_'+restPath.id_recours;
             if (!fs.existsSync(fullPath)) {
                fs.mkdirSync(fullPath, { recursive: true });
              }
             
            // get extension     
              if(file.fieldname === 'file1' ){
                let fileExtension = path.extname(file.originalname);
                file.originalname="file1"+Date.now()+fileExtension;
              }
           
               
           else if (file.fieldname === 'file2') {
                 // get extension  
                let secondFileExtension = path.extname(file.originalname);
                file.originalname="file2"+Date.now()+secondFileExtension;
              }
               else  {
                

                 // get extension  
                let thirdFileExtension = path.extname(file.originalname);
                // console.log(thirdFileExtension);
                file.originalname="file3"+Date.now()+thirdFileExtension;
                  // console.log("fullname",file.originalname)
              }
        // // Check if the directory already exists, if not, create it
       
        
        cb(null, fullPath); 
  
      },
      filename: function (req, file, cb) {
        
          
        
        cb(null, file.originalname);
      }
    })
  });
  
 
  module.exports = upload1; 