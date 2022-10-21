const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');

class User extends Sequelize.Model {}

User.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: true,
            unicode: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unicode: true,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role_id: {
            type: DataTypes.INTEGER,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        shipping: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        billing: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: 'users',
    }
);

module.exports = User;