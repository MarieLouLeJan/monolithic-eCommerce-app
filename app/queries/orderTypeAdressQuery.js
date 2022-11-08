import { Order_type_adress } from '../models/index.js';

export default {

    async addOrderTypeAdress (body) {
        return await Order_type_adress.create(body);
    },
};