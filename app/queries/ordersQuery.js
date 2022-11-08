import { Order, Order_type_adress, AdressType, Product, Adress, Order_product } from '../models/index.js';

export default {

    async getAllOrdersByUser (userId) {
        return await Order.findAll({
            where: { user_id: userId},
            raw: true,
        });
    },

    async getOrderById (id) {
        return await Order.findByPk(id, {
            include: [{ 
                    model: Product, 
                    through: Order_product,
                    as: 'products'
                },{
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
            }],
            raw: true,
            nest: true
        });
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
        // await order.addAdressType(adressTypeToAdd)
    }, 
}