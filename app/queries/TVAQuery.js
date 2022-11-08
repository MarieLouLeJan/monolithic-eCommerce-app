const { Tva } = require("../models");

const TVAQuery = {

    async getAllTVA () {
        return await Tva.findAll({
            include: 'products',
            where: {
                active: true
            }
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

    async unativeTVA (TVA) {
        await TVA.update({
            active: false
        });
    },
    
};

module.exports = TVAQuery;