const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');


const Order_state = sequelize.define('order_states',
    {
        title: {
            type: DataTypes.NUMBER,
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


module.exports = Order_state;
