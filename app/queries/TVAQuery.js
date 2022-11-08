import { TVA } from '../models/index.js';

export default {

    async getAllTVA () {
        return await Tva.findAll({
            include: 'products'
        });
    },

    async getTVAById (id) {
        return await TVA.findByPk(id, {
            include: 'products'
        });
    },

    async createTVA (body) {
        await TVA.create(body)
    },

    // async updateTVA (TVA, body){
    //     await TVA.update(body);
    // },

    async unactiveTVA (TVAId) {
        const TVA = await this.getTVAById(TVAId);
        TVA.active = false;
        await TVA.update();
    },  
};