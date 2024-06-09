const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'sql5.freesqldatabase.com',
    user: 'sql5712831',
    password: 'RiSMcdmHlC',
    database: 'sql5712831',
    port: 3306
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to the MySQL server.');
});

module.exports = connection;
