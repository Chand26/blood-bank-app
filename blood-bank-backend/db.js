//blood-bank-backend/db.js

const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost', // Your database host
    user: 'root',      // Your database user
    password: 'Chandu@2002', // Your database password
    database: 'BloodBankDB', // Your database name
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database.');
});

module.exports = db;



