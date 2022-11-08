import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../database.js';


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

export default AdressType;
