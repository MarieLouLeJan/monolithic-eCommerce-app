const { Adress, AdressType_adress } = require("../models");

const adressQuery = {

    async getAllAdressesByUser (userId) {
        return await Adress.findAll({
            where: {
                user_id: userId,
                active: true
            }
        });
    },

    async getAdressById (adressId) {
        return await Adress.findByPk(adressId)
    },

    async createAdress (body) {
        await Adress.create(body)
    },

    async unactiveAdress (adressId) {
        const adress = await adressQuery.getAdressById(adressId);
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

module.exports = adressQuery;