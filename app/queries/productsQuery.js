const { Category, Product } = require('../models');

const productsQuery = {

    async getAllProducts () {
        const products = await Product.findAll({
            include: 'tva',
            raw: true,
            nest: true
        });
        return products;
    },

    async getProductById (id) {
        const product = await Product.findByPk(id, {
            include: [
                'tva',
                'categories'
            ],
            raw: true,
            nest: true
        });
        return product;
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