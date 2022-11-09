import { Category, Product } from '../models/index.js';

export default {

    async getAllCategories () {
        return await Category.findAll({
            include: 'products'
        });
    },

    async getById (id) {
        return await Category.findByPk(id, {
            include: [
                { 
                    model : Product, as: 'products',
                    include: ['tva'],
                    raw: true,
                    nest: true
                }
            ]
        });
    },

    async createCategory (body) {
        await Category.create(body)
    },

    async updateCategory (body){
        const category = await this.getCategoryById(id);
        await category.update(body);
    },

    async unactiveCategory (categoryId) {
        const category = await this.getAdressById(categoryId);
        category.active = false;
        await category.save();
    },

};