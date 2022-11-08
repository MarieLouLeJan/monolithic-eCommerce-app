const { Category, Product } = require("../models");

const categoriesQuery = {

    async getAllCategories () {
        return await Category.findAll({
            include: 'products',
            where: {
                active: true
            }
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

    async unactiveCategory (category) {
        await category.update({
            active: false
        });
        // OU
        // const category = await adressQuery.getAdressById(categoryId);
        // adress.active = false;
        // await category.save();
    },

};

module.exports = categoriesQuery;