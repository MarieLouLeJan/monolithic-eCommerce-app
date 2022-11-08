const { Role } = require('../models');

const rolesQuery = {

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

module.exports = rolesQuery;