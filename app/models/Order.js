import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../database.js';


const Order = sequelize.define('orders',
    {
        totalHT: {
            type: DataTypes.NUMBER,
            allowNull: false,
            validate:{
                is: /(^\d+$)|(^\d+\.\d$)|(^\d+\.\d\d$)$/i,
            }
        },
        tax: {
            type: DataTypes.NUMBER,
            allowNull: false,
            validate:{
                is: /(^\d+$)|(^\d+\.\d$)|(^\d+\.\d\d$)$/i,
            }
        },
        totalTTC: {
            type: DataTypes.NUMBER,
            allowNull: false,
            validate:{
                is: /(^\d+$)|(^\d+\.\d$)|(^\d+\.\d\d$)$/i,
            }
        },
        quantity: {
            type: DataTypes.NUMBER,
            allowNull: false,
            validate:{
                isNumeric: true,
                isInt: true,
            }
        },
    },
    {
        updatedAt: false,
        sequelize,
        tableName: 'orders',
    }
);

export default Order;