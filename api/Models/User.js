'use strict';
var Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define('user', {
        id_android: {
            type: DataTypes.STRING
        },
        nombre: {
            type: DataTypes.STRING
        }
    });
    return User;
};