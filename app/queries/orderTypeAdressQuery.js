const { Order_type_adress } = require('../models');

const OrderTypeAdress = {

    async addOrderTypeAdress (body) {
        return await Order_type_adress.create(body);
    },

}

module.exports = OrderTypeAdress;