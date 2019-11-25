var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "wedProgGame",
  password: "password123",
  database: "userdb"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "CREATE TABLE users (ID INT not null auto-increment, Name VARCHAR(255), Score INT)";
  //sql to create table is stored as var then called with a function to improve readability
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});
