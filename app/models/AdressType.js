const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');


const AdressType = sequelize.define('adress_types',
    {
        title: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                is: /^[a-zA-Z0-9Ã-ÿ '"°-]+$/i
            }
        },
    },
    {
        sequelize,
        tableName: 'adress_types',
        updatedAt: false,
    }
)


module.exports = AdressType;
