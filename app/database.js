import { Sequelize } from 'sequelize';

const sequelize = new Sequelize("postgresql://spedata:spedata@localhost/ecommerce", {
    logging: false,
    define: {
        createdAt: 'created_at',
    },
})

export default sequelize;
