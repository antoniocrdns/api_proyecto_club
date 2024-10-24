const mysql = require('mysql');
const myConnection = require('express-myconnection');
const dotenv = require('dotenv');

dotenv.config();

const dbOptions = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
};

module.exports = (app) => {
    app.use(myConnection(mysql, dbOptions, 'single'));
};
