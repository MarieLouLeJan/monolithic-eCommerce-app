import { User, Role } from '../models/index.js';

const userQuery = {

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

    async unactiveAccount (userId) {
        const userToUnactive = await User.findByPk(userId);
        userToUnactive.active = false;
        userToUnactive.save();
    }
};

export default userQuery;