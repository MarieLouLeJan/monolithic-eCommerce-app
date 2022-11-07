const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');


const AdressType_adress = sequelize.define('adress_type_adress',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        adress_id: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                isNumeric: true,
                isInt: true
            }
        },
        adress_type_id: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                isNumeric: true,
                isInt: true
            }
        },
    },
    {
        sequelize,
        tableName: 'adress_type_adress',
        timestamps: false,
    }
)


module.exports = AdressType_adress;
