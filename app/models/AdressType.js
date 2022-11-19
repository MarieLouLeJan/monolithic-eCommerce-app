import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../database.js';


const AdressType = sequelize.define('adress_types',
    {
        title: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'adress_types',
        updatedAt: false,
    }
)

export default AdressType;
