'use strict';
var Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    var Registro = sequelize.define('registro', {
        becons: {
            type: DataTypes.STRING
        },
        estado: {
            type: DataTypes.ENUM('Entra', 'Sale')
        },
        hora: {
        	type: DataTypes.TIME()
        },
        fecha: {
        	type: DataTypes.DATE()
        }

    });
    return Registro;
};