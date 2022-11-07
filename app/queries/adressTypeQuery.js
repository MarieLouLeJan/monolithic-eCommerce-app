const { AdressType } = require("../models");

const adressTypeQuery = {

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
            // raw: true,
        });
    },

    async createAdressType (body) {
        await AdressType.create(body)
    },


    async destroyAdressType (adressType) {
        await adressType.destroy();
    },

};

module.exports = adressTypeQuery;