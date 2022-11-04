const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');


const Order_adress_type = sequelize.define('order_adress_type',
    {
        order_id: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
        adress_id: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
        type_id: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                isNumeric: true,
                isInt: true
            }
        }
    },
    {
        sequelize,
        tableName: 'order_adress_type',
        timestamps: false,
    }
)


module.exports = Order_adress_type;
