const { Adress } = require("../models");

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

    async addTypeToAdress (adress, adressType) {
        return await adressType.addAdress(adress);
    }

};

module.exports = adressQuery;