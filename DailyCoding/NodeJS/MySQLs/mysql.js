var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'madang',
    password: 'madang',
    database: 'madang',
    port: '3306',
});

connection.connect();

connection.query('SELECT * FROM book;', function (error, results, fields) {
    if (error) throw error;
    console.log(results);
    console.log('The solution is: ', results[0].solution);
});

connection.end();
