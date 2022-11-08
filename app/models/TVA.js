import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../database.js';


const TVA = sequelize.define('tva',
    {
        title: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
            validate: {
                // De 1% à 99%
                is: /^([1-9]|[1-9][0-9])%$/
            }
        },
        value: {
            type: DataTypes.NUMBER,
            allowNull: false,
            unique: true,
            validate: {
                // de 0.01 à 0.99
                is: /^0\.[0-9]{2}$/
            }
        },
    },
    {
        sequelize,
        tableName: 'tva',
        updatedAt: false
    }
);

export default TVA;