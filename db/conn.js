const {Sequelize} = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize("freedb_SmartBin", "freedb_user-mobile" , "x3P$Q*pU*#EMaKj", { 
    port: 3306, 
    host: "sql.freedb.tech",
    dialect: "sql.freedb.tech",
});


module.exports = sequelize; 
