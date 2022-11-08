const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');


const Order_product = sequelize.define('order_product',
    {
        product_id: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
        order_id: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.NUMBER,
            allowNull: false,
            validate:{
                isNumeric: true,
                isInt: true,
            }
        },
        priceHT: {
            type: DataTypes.NUMBER,
            allowNull: false,
            validate:{
                is: /(^\d+$)|(^\d+\.\d$)|(^\d+\.\d\d$)$/i,
            }
        },
        tva: {
            type: DataTypes.NUMBER,
            allowNull: false,
            validate:{
                is: /(^\d+$)|(^\d+\.\d$)|(^\d+\.\d\d$)$/i,
            }
        },
    },
    {
        timestamps: false,
        sequelize,
        tableName: 'order_product',
    }
);

Order_product.removeAttribute('id');


module.exports = Order_product;