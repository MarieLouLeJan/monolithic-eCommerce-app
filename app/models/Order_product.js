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
            validate:{
                is: /(^\d+$)|(^\d+\.\d$)|(^\d+\.\d\d$)$/i,
            }
        },
        TVA: {
            type: DataTypes.NUMBER,
            allowNull: false,
            unique: true,
            validate: {
                // de 0.01 à 0.99
                is: /^0\.[0-9]{2}$/
            }
        },
        priceTTC: {
            type: DataTypes.NUMBER,
            allowNull: false,
            validate:{
                is: /(^\d+$)|(^\d+\.\d$)|(^\d+\.\d\d$)$/i,
            }
        }
    },
    {
        timestamps: false,
        sequelize,
        tableName: 'order_product',
    }
);

export default Order_product;