const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');

class Order_has_product extends Sequelize.Model {}

Order_has_product.init(
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
        },
        priceHT: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
        tva: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        timestamps: false,
        sequelize,
        tableName: 'order_has_product',
    }
);

Order_has_product.removeAttribute('id')

module.exports = Order_has_product;