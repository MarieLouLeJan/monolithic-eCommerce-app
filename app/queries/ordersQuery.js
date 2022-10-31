const { Order } = require('../models');

const ordersQuery = {

    async getAllOrders () {
        const userOrders = await Order.findAll({
            where: { user_id: req.session.user.id},
            raw: true,
        });
        return userOrders;
    },

    async getOrderById (id) {
        const order = await Order.findByPk( {id,
            include: [
                { model: Product, thought: Order_has_product, as: 'products'}   
            ],
            raw: true,
            nest: true
        });
        return order;
    },

    async createOrder (body) {
        await Order.create(body);
    },

    async addProductToOrder (order, productToAdd, body) {
        await order.addProduct(productToAdd, 
            { through: { body }})
    } 
}

module.exports = ordersQuery;