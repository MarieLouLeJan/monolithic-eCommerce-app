import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../database.js';


const Product_review = sequelize.define('product_review',
    {
        product_id: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
        note: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        }
    },
    {
        timestamps: false,
        sequelize,
        tableName: 'product_review',
    }
);

Product_review.removeAttribute('id');


export default Product_review;
