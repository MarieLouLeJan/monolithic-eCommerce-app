const { Sequelize } = require('sequelize');


const sequelize = new Sequelize(process.env.PG_URL, {
    // logging false pour ne pas polluer le terminal avec les requêtes
    // si on veut voir les requêtes, il faut enlever cette ligne
    // logging: false,
    define: {
        createdAt: 'created_at',
    },
    // up: (queryInterface, Sequelize) => {
    //     return queryInterface.createTable('items', {
    //         created_at: {
    //             // allowNull: false,
    //             type: Sequelize.DATE
    //         },
    //         updated_at: {
    //             // allowNull: false,
    //             type: Sequelize.DATE
    //         },
    //     })
    // }
})


module.exports = sequelize;
