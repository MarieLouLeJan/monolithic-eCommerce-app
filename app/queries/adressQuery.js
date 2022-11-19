import { Adress } from '../models/index.js';

export default {

    async getAllAdressesByUser (userId) {
        return await Adress.findAll({
            where: {
                user_id: userId,
                active: true
            }
        });
    },

    async getById (adressId) {
        return await Adress.findByPk(adressId)
    },

    async createAdress (body) {
        await Adress.create(body)
    },

    async unactiveAdress (id) {
        const adress = await Adress.findByPk(id);
        adress.active = false;
        await adress.save();
    },

    async addTypeToAdress (adressType, adress) {
        return await adress.addAdress_types(adressType);
    },

    async getAdressTypeAdress (adressId, typeId) {
        return await AdressType_adress.findAll({
            where: {
                adress_id: adressId,
                adress_type_id: typeId
            }
        })
    }
};