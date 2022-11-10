import { Category, Product } from '../models/index.js';

const categoryQuery = {

    async getAllCategories () {
        return await Category.findAll({
            include: 'products',
            where: {
                active: true
            }
        });
    },
    
    async getAllCategoriesAdmin () {
        return await Category.findAll({
            include: 'products',
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

    async updateCategory (id, body){
        const category = await categoryQuery.getById(id);
        await category.update(body);
    },

    async unactiveCategory (category) {
        category.active = false;
        await category.save();
    },

    async activeCategory (category) {
        category.active = true;
        await category.save();
    }
};

export default categoryQuery;