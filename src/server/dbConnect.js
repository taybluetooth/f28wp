var mysql = require('mysql');

var con = mysql.createConnection({
	host: "localhost",
	database: "userdb",
	user: "webProgGame",
	password: "password123"
});

con.connect(function(err) {
	if(err) throw err;
	console.log("Connected to Database!");
});
