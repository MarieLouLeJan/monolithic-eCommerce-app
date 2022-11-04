const { Category, Product } = require("../models");

const categoriesQuery = {

    async getAllCategories () {
        return await Category.findAll({
            include: 'products'
        });
    },

    async getCategoryById (id) {
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

    async updateCategory (category, body){
        await category.update(body);
    },

    async destroyCategory (category) {
        await category.destroy();
    },

};

module.exports = categoriesQuery;