import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../database.js';

const OrderState = sequelize.define('order_states',
    {
        title: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
        },
    },
    {
        sequelize,
        tableName: 'order_states',
        updatedAt: false,
    }
);


export default OrderState;
