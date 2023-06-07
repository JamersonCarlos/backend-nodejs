const {DataTypes} = require('sequelize');
const db = require('../db/conn');
const SmartBin = db.define('SmartBin', { 
    identidade: { 
        type: DataTypes.STRING, 
        required: true,
    },
    setor: { 
        type: DataTypes.STRING, 
    },
    localização: { 
        type: DataTypes.STRING,
        required: true 
    }, 
    capacidade_litros: { 
        type: DataTypes.INTEGER, 
        required: true, 
    }, 
    altura_cm: { 
        type: DataTypes.FLOAT, 
        required: true,
    },
    altura_lixo: { 
        type: DataTypes.FLOAT, 
        required: true,
    },
});

module.exports = SmartBin; 