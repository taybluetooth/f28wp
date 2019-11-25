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
  var sql = "INSERT INTO users (ID , Name, Score) VALUES ?";
  var values = [
    [null, 'Haydn', '200'],
    [null, 'Callum', '300'],
    [null, 'Michael', '100']
  ];
  //sql to create table is stored as var then called with a function to improve readability
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});
