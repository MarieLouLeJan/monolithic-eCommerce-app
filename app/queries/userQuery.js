import { User, Role } from '../models/index.js';

export default {

    async getAllUsers () {
        return await User.findAll({
            raw: true
        });
    },

    async getOneUserByEmail (condition) {
        return await User.findOne({
            where: {
                email: condition,
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