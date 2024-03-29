const mysql=require("mysql");

export const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"cR4J7yvkT6S3c2",
    database:"test"
});