import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../database.js';

const Category = sequelize.define('categories',
    {
        title: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
            validate: {
                is: /^[a-zA-Z0-9Ã-ÿ '"°-]+$/i
            }
        }
    },
    {
        sequelize,
        tableName: 'categories',
        updatedAt: false,
    }
)

export default Category;
