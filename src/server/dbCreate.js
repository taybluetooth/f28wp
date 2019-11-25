var mysql = require('mysql');

var con = mysql.createConnection({
//Info for creating a new db (login details for mysql on localhost)
  host: "localhost",
  user: "webProgGame",
  password: "password123"
});

con.connect(function(err) {
//function called when connection is attempted
  if (err) throw err;
  console.log("Connected!");
  con.query("CREATE DATABASE userdb", function (err, result) {//runs sql to create the db when its called.
    if (err) throw err;
    console.log("Database created");
  });
});
//considered adding an app.listen but only want that to trigger the queries.
//Can edit the query to return an output to the page in the browser rather than just in terminal.
