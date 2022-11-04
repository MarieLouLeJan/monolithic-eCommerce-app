const { Order } = require('../models');

const ordersQuery = {

    async getAllOrders () {
        return await Order.findAll({
            where: { user_id: req.session.user.id},
            raw: true,
        });
    },

    async getOrderById (id) {
        return await Order.findByPk( {id,
            include: [
                { model: Product, thought: Order_has_product, as: 'products'}   
            ],
            raw: true,
            nest: true
        });
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