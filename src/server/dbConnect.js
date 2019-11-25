const mysql = require('mysql');

const con = mysql.createConnection({
	host: "localhost",
	user: "webProgGame",
	password: "password123",
	database: "userdb"
});

con.connect(function(err) {
    if (err) {
        console.error('Error connecting: ' + err.stack);
        return;
    }

    console.log('Connected as id ' + con.threadId);
});

con.query('SELECT * FROM users', function (error, results) {
    if (error)
        throw error;

    results.forEach(result => {
        console.log(result);
    });
});

con.end();
