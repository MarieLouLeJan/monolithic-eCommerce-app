const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');

class Product extends Sequelize.Model {}

Product.init(
    {
        ref: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        ref: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
        },
        priceHT: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
        },
    },
    {
        sequelize,
        tableName: 'products',
    }
);

module.exports = Product;
