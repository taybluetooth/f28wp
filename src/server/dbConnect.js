var express = require('express');
var mysql = require('mysql');
var app = express();

var con = mysql.createConnection({
//Properties of the mysql server to connect to
	host: 'localhost', //should be as simple as changing to appropriate host, but wouldn't run locally for me so haven't made that change
	user: 'webProgGame',
	password: 'password123',
	database: 'userdb'
});

con.connect(function(error) {
	//returns error if connection fails
	if (!!error) {
		console.log('Error connecting');
	} else {
		console.log('Connected');
	}
});

app.get('/', function(req, resp) {
	//mysql query that isn't ran until called from app using port 1337
	con.query("SELECT * FROM users", function(error, rows, fields){
		//callback
		if (!!error) {
			console.log('Error in query');
		} else {
			console.log('Successful query\n');
			console.log(rows);
		}
	});
});

app.listen(1337);
//once script is run locally, if terminal says connected, go to localhost:1337 in a browser to run the query
