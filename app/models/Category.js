const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');


const Category = sequelize.define('categories',
    {
        title: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
            validate: {
                is: /^[a-zA-Z0-9Ã-ÿ '"°-]+$/i
            }
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'categories',
        updatedAt: false,
    }
)


module.exports = Category;
