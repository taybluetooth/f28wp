var mysql = require ('mysql');
##This code needs deleted, use this file to push code to database on server, get info from cookies from each users session. 
##push code up every 5 seconds for testing, use score tied to time as a good indicator its working.
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
