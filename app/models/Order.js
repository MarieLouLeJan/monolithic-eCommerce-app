const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');

class Order extends Sequelize.Model {}

Order.init(
    {
        totalTTC: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
        totalHT: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
        tax: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        adress: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        }
    },
    {
        timestamps: false,
        sequelize,
        tableName: 'orders',
    }
);

module.exports = Order;