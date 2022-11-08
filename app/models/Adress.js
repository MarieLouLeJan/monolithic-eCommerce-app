import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../database.js';


const Adress = sequelize.define('adresses', 
    {
        entitled: {
            type: DataTypes.STRING,
            allowNull: true,
            validate:{
                is: /^[a-zA-Z0-9Ã-ÿ '"°-]+$/i,
            }
        },
        number: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate:{
                is: /^\d+$/i,
            }
        },
        number_complement: {
            type: DataTypes.STRING,
            allowNull: true,
            // validate:{
            //     is: /^[a-zA-Z0-9Ã-ÿ '"°-]+$/i,
            // }
        },
        street: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: /^[a-zA-Z0-9Ã-ÿ '"°-]+$/i,
                min: 3,
                max: 100
            }
        },
        postal_code: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate:{
                is: /[0-9]{5}/i,
            }
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                is: /^[a-zA-Z0-9Ã-ÿ '"°-]+$/i,
            }
        },
        country: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                is: /^[a-zA-Z\-\']+$/i,
            }
        },
        complement: {
            type: DataTypes.STRING,
            allowNull: true,
            // validate:{
            //     is: /^[a-zA-Z0-9Ã-ÿ '"°-]+$/i,
            // }
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
