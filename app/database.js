import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('postgres://ecommerce:ecommerce@localhost/ecommerce', {
    // logging: false,
    define: {
        createdAt: 'created_at',
    },
})

export default sequelize;
