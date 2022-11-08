import { Order, Order_type_adress, AdressType, Product, Adress, Order_product } from '../models/index.js';

export default {

    async getAllOrdersByUser (body) {
        return await Order.findAll({
            where: { 
                user_id: body
            },
            include: {
                model: OrderState, 
                as: 'order_states',
            },
        })
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

    async getProductsByOrder (orderId){
        return await Order_product.findAll({
            where: {
                order_id: orderId,
            },
            include: {
                model: Product, 
            }   
        })
    },

    async getOrderTypeAdress (id) {
        return await Order_type_adress.findAll({
            where: {
                order_id: id
            },
            include:[
                {
                    model: AdressType,
                    as: 'adress_type'
                },{
                    model: Adress,
                    as: 'adresses'
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