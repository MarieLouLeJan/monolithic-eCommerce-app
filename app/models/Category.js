const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');

class Category extends Sequelize.Model {}

Category.init(
    {
        name: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
        }
    },
    {
        sequelize,
        tableName: 'categories',
    }
)


module.exports = Category;
