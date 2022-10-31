const { User } = require('../models');

const usersQuery = {

    async getAllUsers () {
        const allUsers = await User.findAll({
            raw: true
        });
        return allUsers;
    },

    async getOneUserByEmail (condition) {
        const user = await User.findOne({
            where: {
                email: condition,
            },
            include: 'role'
        });
        return user
    },

    async createUser (body) {
        await User.create(body);
    }

};

module.exports = usersQuery;