import { Order_type_adress } from '../models/index.js';

export default {

    async createOrderTypeAdress (body) {
        return await Order_type_adress.create(body);
    },
};