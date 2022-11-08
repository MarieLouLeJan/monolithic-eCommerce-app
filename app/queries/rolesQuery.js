import { Role } from '../models/index.js';

export default {

    async getAllRole () {
        return await Role.findAll({
            include:[
                'users',
            ]
        })
    },

    async getRoleByRoleName (condition) {
        return await Role.findAll({
            where: {
                name: condition,
            },
            include: 'users'
        });
    },
};