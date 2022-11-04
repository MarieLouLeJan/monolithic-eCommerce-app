const { Category, Product } = require('../models');

const productsQuery = {

    async getAllProducts () {
        return await Product.findAll({
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

    async createProduct (body) {
        await Product.create(body)
    },

    async updateProduct (product, body){
        await product.update(body);
    },

    async destroyProduct (product) {
        await product.destroy();
    },

};

module.exports = productsQuery;