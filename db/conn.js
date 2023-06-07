const {Sequelize} = require('sequelize');
const sequelize = new Sequelize('iot_project', 'root', 'carlos', { 
    port: 3306, 
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize; 
