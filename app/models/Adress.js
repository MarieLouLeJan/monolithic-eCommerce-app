import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../database.js';


const Adress = sequelize.define('adresses', 
    {
        entitled: {
            type: DataTypes.STRING,
            allowNull: true,

        },
        number: {
            type: DataTypes.INTEGER,
            allowNull: false,

        },
        number_complement: {
            type: DataTypes.STRING,
            allowNull: true,

        },
        street: {
            type: DataTypes.STRING,
            allowNull: false,

        },
        postal_code: {
            type: DataTypes.INTEGER,
            allowNull: false,

        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,

        },
        country: {
            type: DataTypes.STRING,
            allowNull: false,

        },
        complement: {
            type: DataTypes.STRING,
            allowNull: true,

        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    },
    {
        updatedAt: false,
        sequelize,
        tableName: 'adresses',
    }
)


export default Adress;
