const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');

class TVA extends Sequelize.Model {}

TVA.init(
    {
        title: {
            type: DataTypes.TEXT,
            allowNull: false,
            unicode: true,
            unique: true,
        },
        value: {
            type: DataTypes.NUMBER,
            allowNull: false,
            unicode: true,
            unique: true,
        },
    },
    {
        sequelize,
        tableName: 'tva',
        timestamps: false
    }
);

module.exports = TVA;