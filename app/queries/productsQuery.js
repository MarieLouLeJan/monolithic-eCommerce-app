const { Category, Product } = require('../models');

const productsQuery = {

    async getAllProducts () {
        return await Product.findAll({
            where: {
                active: true,
            },
            include: 'tva',
            raw: true,
            nest: true
        });
    },

    async getProductById (id) {
        return await Product.findByPk(id, {
            include: [
                'tva',
                'categories'
            ],
            raw: true,
            nest: true
        });
    },

    async getProductByIdCheckout (id) {
        return await Product.findByPk(id);
    },

    async createProduct (body) {
        await Product.create(body)
    },

    async updateProduct (product, body){
        await product.update(body);
    },

    async unactiveProduct (product) {
        await product.update({
            active: false
        });
    },

};

module.exports = productsQuery;