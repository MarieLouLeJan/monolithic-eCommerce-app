import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../database.js';

const Category = sequelize.define('categories',
    {
        title: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'categories',
        updatedAt: false,
    }
)

export default Category;
