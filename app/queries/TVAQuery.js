import { TVA } from '../models/index.js';

export default {

    async getAllTVA () {
        return await TVA.findAll({
            include: 'products'
        });
    },

    async getById (id) {
        return await TVA.findByPk(id, {
            include: 'products'
        });
    },

    async createTVA (body) {
        await TVA.create(body)
    },

    async unactiveTVA (TVAId) {
        const TVA = await this.getTVAById(TVAId);
        TVA.active = false;
        await TVA.update();
    },  
};