import { OrderState } from '../models/index.js';

export default {

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