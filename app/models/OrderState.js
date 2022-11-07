const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');


const OrderState = sequelize.define('order_states',
    {
        title: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
            validate: {
                is: /^[a-zA-Z0-9Ã-ÿ '"°-]+$/i
            }
        },
    },
    {
        sequelize,
        tableName: 'order_states',
        updatedAt: false,
    }
);


module.exports = OrderState;
