const { Category, Product } = require("../../models");

const categoriesQuery = {

    async getAllCategories () {
        const categories = await Category.findAll({
            include: 'products'
        });
        return categories;
    },

    async getCategoryById (id) {
        const category = await Category.findByPk(id{
            include: [
                { 
                    model : Product, as: 'products',
                    include: ['tva'],
                    raw: true,
                    nest: true
                }
            ]
        });
        return category;
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