const { User } = require('../models');

const usersQuery = {

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
            include: 'role'
        });
    },

    async createUser (body) {
        await User.create(body);
    }

};

module.exports = usersQuery;