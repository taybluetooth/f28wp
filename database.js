var mysql = require ('mysql');

var con = mysql.connection({
  host: "localhost",
  user: "root",
  password: "password"
});

con.connect(function(err){
  if (err) throw err;
  console.log("Connected!");
  con.query("CREATE DATABASE testDB", function(err, result){
    if (err) throw err;
    console.log("Database Created");
  });
});
