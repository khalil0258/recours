const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes=require('./routes/authRoutes')



require("dotenv/config");
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.options("*", cors());

//middleware

//this one is to make our backend server understand/recognize the JSON format
app.use(bodyParser.json());



const PORT = process.env.PORT || 4000;


//routers
app.use(`/auth`, authRoutes);         //authentification routes 

 








// app server 
const start = async () => {
    try {
     
        app.listen(PORT, () => {
        console.log(`server is running on port ${PORT}`);
      });
    } catch (error) {
      console.error("Error starting the server:", error);
    }
  };
 

// function that starts the server 
  start();