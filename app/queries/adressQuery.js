const { Adress, User } = require("../models");

const adressQuery = {

    async getAllAdressesByUser (userId) {
        return await Adress.findAll({
            where: {
                user_id: userId
            }
        });
    },

    async createAdress (body) {
        await Adress.create(body)
    },


    async destroyAdress (adress) {
        await adress.destroy();
    },

};

module.exports = adressQuery;