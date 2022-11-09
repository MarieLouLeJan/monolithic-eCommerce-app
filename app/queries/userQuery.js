import { User, Role } from '../models/index.js';

export default {

    async getAllUsers () {
        return await User.findAll({
            where: {
                active: true
            },
            raw: true,
        });
    },

    async getAllUsersByRole (role) {
        return await Role.findAll({
            where: {
                title: role
            },
            include: 'users'
        })
    },

    async getOneUserByEmail (condition) {
        return await User.findOne({
            where: {
                email: condition,
                active: true,
            },
            include: [
                {
                    model: Role, as: 'roles',
                }
            ],
        });
    },

    async createUser (body) {
        await User.create(body);
    },
};