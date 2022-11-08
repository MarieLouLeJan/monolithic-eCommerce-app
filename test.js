const usersQuery = require('./app/queries/usersQuery');

const getRole = {

    async  getusers () {
        const users = await usersQuery.getAllUsersByRole("admin")
        console.log(users)
    },
}

console.log(getRole.getusers())
