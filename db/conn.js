const {Sequelize} = require('sequelize');
const sequelize = new Sequelize("freedb_smartbins", "freedb_iot_project", "9r$*Fxj$zTxhGA!", { 
    port: 3306, 
    host: "sql.freedb.tech",
    dialect: 'mysql',
});

module.exports = sequelize; 
