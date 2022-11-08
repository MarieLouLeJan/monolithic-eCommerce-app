import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../database.js';

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


export default OrderState;
