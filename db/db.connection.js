var mysql = require("mysql");
//here we confing .env file.
const dotenv = require("dotenv");
dotenv.config();
//here we create a connection.
var connection = mysql.createConnection({
  host: process.env.HOST,
  database: process.env.DATABASE_NAME ,
  user: process.env.USER,
  password: process.env.PASSWORD,
});
//here we check database is connected or not.
connection.connect(function (err) {
  if (err) throw err;
  // conn.query("CREATE DATABASE nodeapp",
  //     function (err, result) {
  //         if (err) throw err;
  //         console.log("Database is created successfully");
  //     });
  console.log("Database Connection Successfully..");
});
//here we export a connection.
module.exports = connection;