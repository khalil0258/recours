const multer = require('multer');
const fs=require("fs");
const path = require('path');
 
let fullName="";
const baseDirectoryPath = './assure/';
const upload1 = multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb,) {
// console.log("dddd",req.files)
        // console.log("hell",req.app.locals.path);
        let restPath=req.app.locals.path;
             let fullPath = baseDirectoryPath+ '/'+restPath.id_assure+'/'+restPath.id_recours;
             if (!fs.existsSync(fullPath)) {
                fs.mkdirSync(fullPath, { recursive: true });
              }
             if (file.fieldname === 'file1') {
            // get extension     
          const fileExtension = path.extname(file.originalname);
             fullName="file1"+Math.floor(new Date().getTime() / 1000)+fileExtension;
           
              } else if (file.fieldname === 'file2') {
                 // get extension  
                const secondFileExtension = path.extname(file.originalname);
                  fullName="file2"+Math.floor(new Date().getTime() / 1000)+secondFileExtension;
              }
               else if (file.fieldname === 'file3') {
                console.log(file);

                 // get extension  
                const thirdFileExtension = path.extname(file.originalname);
                  fullName="file3"+Math.floor(new Date().getTime() / 1000)+thirdFileExtension;
              }
        // Check if the directory already exists, if not, create it
       
        
        cb(null, fullPath); 
  
      },
      filename: function (req, file, cb) {
        cb(null, fullName);
      }
    })
  });
  
 
  module.exports = upload1; const multer = require('multer');
const fs=require("fs");
const path = require('path');
//  
let fullName="";
let i=0;
const baseDirectoryPath = './assure/';
const upload1 = multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb,) {
        console.log("first",i)
        console.log(file)
        i=i+1;
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