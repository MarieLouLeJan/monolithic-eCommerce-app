import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../database.js';


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
        },
        TVA: {
            type: DataTypes.NUMBER,
            allowNull: false,
            unique: true,
        },
    },
    {
        timestamps: false,
        sequelize,
        tableName: 'order_product',
    }
);

Order_product.removeAttribute('id');


export default Order_product;
