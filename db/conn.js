const {Sequelize} = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_DBNAME, process.env.DB_USERNAME ,process.env.DB_PASSWORD, { 
    port: 3306, 
    host: process.env.DB_HOST,
    dialect: 'mysql',
});


module.exports = sequelize; 
