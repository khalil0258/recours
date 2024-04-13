const express = require("express");
const app = express();
const cors = require("cors");
const path = require('path');
const bodyParser = require("body-parser");
require("dotenv/config");
const authRoutes = require('./routes/authRoutes')
const recoursRoutes = require('./routes/recoursRoutes')
const db = require('./db/connect');
const session = require('express-session')
const cookieParser = require('cookie-parser')

const statistiquesRoute = require('./routes/statistiquesRoute');
const userInfos = require('./routes/userInfos');
// const { checkSessionExpiration } = require("./middleware/checkSessionExpiration");

const PORT = process.env.PORT || 4000;


app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["POST", "GET", "DELETE", "UPDATE","patch","PUT"],
  credentials: true 
}));

//app.use(express.static('assure')) ;
// Définir le dossier statique pour les fichiers PDF
app.use('/assure', express.static('./assure'));



app.options("*", cors());

//this one is to make our backend server understand/recognize the  
 
app.use(express.json()); //nouvelle method de expresse

app.use(bodyParser.json());
app.use(cookieParser());

// configuration de session
app.use(session({
  key: "user-session",
  secret: 'secret', // a secret key used to encrypt the session cookie
  resave: false,
  saveUninitialized: false,
  cookie: { 
      secure: false,
      maxAge: 1000 * 60 * 60 * 24
  } // set the session cookie properties
}))

 
 

// BDD connection
db.connect(function(err) {
  if (err) console.log("connection a la BDD echoue");
  else
  console.log("connection reussi");
});


 
 


 
//routers
app.use(`/auth`, authRoutes);         //authentification routes 
app.use(`/recours`, recoursRoutes);         //recours  routes 
app.use(`/user`, userInfos);         //recours  routes 

app.use(statistiquesRoute); 


 

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
  start()