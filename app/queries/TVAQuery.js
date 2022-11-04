const { Tva } = require("../models");

const TVAQuery = {

    async getAllTVA () {
        return await Tva.findAll({
            include: 'products'
        });
    },

    async getTVAById (id) {
        return await Tva.findByPk(id, {
            include: 'products'
        });
    },

    async createTVA (TVA, body) {
        await Tva.create(body)
    },

    async updateTVA (TVA, body){
        await TVA.update(body);
    },

    async destroyTVA (TVA) {
        await TVA.destroy();
    },
    
};

module.exports = TVAQuery;