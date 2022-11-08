import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../database.js';


const Role = sequelize.define('roles',
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            unicode: true,
            unique: true,
            validate: {
                is: /^[a-zA-Z ]+$/i,
            }
        },
    },
    {
        sequelize,
        updatedAt: false,
        tableName: 'roles',
    }
);

export default Role;
