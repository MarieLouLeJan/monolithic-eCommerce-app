import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../database.js';


const Role = sequelize.define('roles',
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            unicode: true,
            unique: true,
        },
    },
    {
        sequelize,
        updatedAt: false,
        tableName: 'roles',
    }
);

export default Role;
