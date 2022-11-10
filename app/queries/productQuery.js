import { Product } from '../models/index.js';

const productQuery = {

    async getAllProducts () {
        return await Product.findAll({
            where: {
                active: true,
            },
            include: 'tva',
        });
    },

    async getAllProductsAdmin () {
        return await Product.findAll({
            include: 'tva',
        });
    },

    async getById (id) {
        return await Product.findByPk(id, {
            include: [
                'tva',
                'categories',
                'users'
            ],
        });
    },

    async getProductByIdCheckout (id) {
        return await Product.findByPk(id);
    },

    async removeFromStock (id, qty){
        const product = await productQuery.getById(id)
        product.stock = product.stock -= qty;
        product.save()
    },

    async addToStock (id, qty){
        const product = await productQuery.getById(id)
        product.stock = product.stock += qty;
        product.save()
    },

    async createProduct (body) {
        await Product.create(body)
    },

    async updateProduct (id, body){
        const product = await productQuery.getById(id);
        await product.update(body)
    },

    async unactiveProduct (product) {
        product.active = false;
        product.save();
    },

    async activeProduct (product) {
        product.active = true;
        product.save();
    },
};

export default productQuery;