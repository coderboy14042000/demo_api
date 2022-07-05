var mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();

var connection = mysql.createConnection({
  host: process.env.HOST,
  database: process.env.DATABASE_NAME ,
  user: process.env.USER,
  password: process.env.PASSWORD,
});
connection.connect(function (err) {
  if (err) throw err;
  // conn.query("CREATE DATABASE nodeapp",
  //     function (err, result) {
  //         if (err) throw err;
  //         console.log("Database is created successfully");
  //     });
  console.log("Database Connection Successfully..");
});
module.exports = connection;
