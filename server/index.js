const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");



app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.options("*", cors());

//middleware

//this one is to make our backend server understand/recognize the JSON format
app.use(bodyParser.json());



const PORT = process.env.PORT || 3000;


//routers