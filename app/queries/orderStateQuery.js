const { OrderState } = require("../models");

const orderStateQuery = {

    async getAllOrderStates () {
        return await OrderState.findAll();
    },

    async createOderState (body) {
        return await OrderState.create(body)
    },

};

module.exports = orderStateQuery;