const { Role } = require('../models');

const rolesQuery = {

    async getRoleByRoleName (condition) {
        return await Role.findAll({
            where: {
                name: condition,
            },
            include: 'users'
        });
    },

};

module.exports = rolesQuery;