const { Tva } = require("../models");

const TVAQuery = {

    async getAllTVA () {
        const TVA = await Tva.findAll({
            include: 'products'
        });
        return TVA;
    },

    async getTVAById (id) {
        const TVA = await Tva.findByPk(id, {
            include: 'products'
        });
        return TVA;
    },

    async createTVA (TVA, body) {
        TVA = await Tva.create(body)
    },

    async updateTVA (TVA, body){
        await TVA.update(body);
    },

    async destroyTVA (TVA) {
        await TVA.destroy();
    },
    
};

module.exports = TVAQuery;