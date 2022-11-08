const { Sequelize } = require('sequelize');


const sequelize = new Sequelize(process.env.PG_URL, {
    // logging: false,
    define: {
        createdAt: 'created_at',
    },
})


module.exports = sequelize;
