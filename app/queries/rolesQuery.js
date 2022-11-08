import { Role } from '../models/index.js';

export default {

    async getRoleByRoleName (condition) {
        return await Role.findAll({
            where: {
                name: condition,
            },
            include: 'users'
        });
    },
};