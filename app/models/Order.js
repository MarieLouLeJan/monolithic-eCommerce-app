import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../database.js';


const Order = sequelize.define('orders',
    {
        totalHT: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
        tax: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
        totalTTC: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
    },
    {
        updatedAt: false,
        sequelize,
        tableName: 'orders',
    }
);

export default Order;