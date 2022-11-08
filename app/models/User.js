import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../database.js';


const User = sequelize.define('users',
    {
        firstname: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                // Uniquement des lettre maj ou min
                is: /^[a-zA-Z\-]+$/i,
                min: 2,
                max: 30
            }
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                // Uniquement des lettre maj ou min
                is: /^[a-zA-Z\-\']+$/i,
                min: 2,
                max: 30
            },
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            // password: au moins 8 caractères, 1 lettre MAJ, 1 lettre min, 1 chiffre
            // Enlevé a cause de bcrypt qui renvoie un password crypté
            // validate: {
            //     is: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/i,
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
        tableName: 'users',
    }
);

export default User;
