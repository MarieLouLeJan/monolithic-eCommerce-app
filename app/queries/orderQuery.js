import { Order, Order_type_adress, AdressType, Product, Adress, Order_product, OrderState } from '../models/index.js';

export default {

    async getAllOrdersByUser (userId) {
        return await Order.findAll({
            where: { user_id: userId},
            raw: true,
        });
    },

    async getById (id) {
        return await Order.findByPk(id, {
            include: [{
                    model: Order_type_adress,
                    as: 'order_type_adress',
                    include:[
                        {
                            model: AdressType,
                            as: 'adress_type'
                        },{
                            model: Adress,
                            as: 'adresses'
                        }
                    ]
                },{
                    model: OrderState,
                    as: 'order_states'
                }],
            raw: true,
            nest: true
        });
    },

    async getAllProductsByOrder (orderId) {
        return await Order_product.findAll({
            where: {
                order_id: orderId
            },
            include: {
                model: Product,
            },
        })
    },

    async getAllAdressesByOrder (orderId) {
        return Order_type_adress.findAll({
            where: {
                order_id: orderId
            },
            include: [
                {
                    model: Adress,
                    as: 'adresses'
                },{
                    model: AdressType,
                }
            ]
        })
    },

    async createOrder (body) {
        return await Order.create(body);
    },

    async addProductToOrder (order, productToAdd, body) {
        await order.addProducts(productToAdd, 
            { through: body })
    },

    async addAdressToOrder (adressTypeToAdd, order) {
        return await adressTypeToAdd.addOrders(order);
    }, 
}