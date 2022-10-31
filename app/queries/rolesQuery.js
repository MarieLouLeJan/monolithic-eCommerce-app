const { Role } = require('../models');

const rolesQuery = {

    async getRoleByRoleName (condition) {
        const role = await Role.findAll({
            where: {
                name: condition,
            },
            include: 'users'
        });
        return role;
    },

};

module.exports = rolesQuery;