import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../database.js';


const Product = sequelize.define('products',
    {
        ref: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        priceHT: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate:{
                isNumeric: true,
                isFloat: true
            }
        },
        stock: {
            type: DataTypes.NUMBER,
            allowNull: false,
            validate: {
                isNumeric: true,
                isInt: true,
            }
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    },
    {
        sequelize,
        updatedAt: false,
        tableName: 'products',
    }
);

export default Product;
