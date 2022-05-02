import mysql from 'mysql'
import dotenv from 'dotenv'

dotenv.config()

var connection = mysql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_DATABASE
});

connection.connect(function(err) {
    if (err) 
        console.log(err.message);
    else 
        console.log('Connected Successfully to MYSQL')
});

export default connection;