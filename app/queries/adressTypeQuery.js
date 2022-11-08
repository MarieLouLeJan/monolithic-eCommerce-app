import { AdressType } from '../models/index.js';

export default {

    async getAllAdressTypes () {
        return await AdressType.findAll();
    },

    async getAdressTypeById (id) {
        return await AdressType.findByPk(id)
    },

    async getAdressTypeWhere (condition) {
        return await AdressType.findAll({
            where: {
                title: condition,
            }
        });
    },

    async createAdressType (body) {
        await AdressType.create(body)
    },


    async destroyAdressType (adressType) {
        await adressType.destroy();
    },

};