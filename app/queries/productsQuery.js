import { Product } from '../models/index.js';

export default {

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

    async getProductByIdCheckout (id) {
        return await Product.findByPk(id);
    },

    async createProduct (body) {
        await Product.create(body)
    },

    async updateProduct (productId, body){
        const product = await this.getProductById(productId);
        product.update(body)
    },

    async unactiveProduct (productId) {
        const product = await this.getProductById(productId);
        product.actice = false;
        product.save();
    },

};