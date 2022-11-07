const { OrderState } = require("../models");

const orderStateQuery = {

    async getAllOrderStates () {
        return await OrderState.findAll();
    },

    async createOderState (body) {
        await OrderState.create(body)
    },


    async destroyAdressType (orderState) {
        await orderState.destroy();
    },

};

module.exports = orderStateQuery;