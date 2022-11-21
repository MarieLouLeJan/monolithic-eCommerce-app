import { Product, Product_review, User } from '../models/index.js';
import { Op } from "sequelize";

const productQuery = {

    async getAllActiveProducts () {
        return await Product.findAll({
            where: {
                active: true,
            },
            include: 'tva',
        });
    },

    async getAllUnactiveProducts () {
        return await Product.findAll({
            where: {
                active: false,
            },
            include: 'tva',
        });
    },


    async getProductById (id) {
        return await Product.findByPk(id, {
            include: [
                'tva',
                'categories',
                'users',
            ],
        });
    },

    async getReviewsByProduct (id) {
        return await Product_review.findAll({
            where: { 
                product_id: id 
            },
            include: {
                model: User,
            },
        })
    },

    async addReviewToProduct (body) {
        return await Product_review.create(body)
    },

    async getProductsBySearch (search) {
        return await Product.findAll({ 
            where: [
                { title: { [Op.iLike]: '%' + search + '%' } },
                { active: true }
            ],
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

    async createProduct (body) {
        await Product.create(body)
    },

    async updateProduct (id, body){
        const product = await productQuery.getProductById(id);
        await product.update(body)
    },

    async unactiveProduct (id) {
        const product = await productQuery.getProductById(id)
        console.log(product)
        product.active = false;
        product.save();
    },

    async activeProduct (id) {
        const product = await productQuery.getProductById(id)
        product.active = true;
        product.save();
    },

    // async getAndCountAllProducts (perpage, page) {
    //     return await Product.findAndCountAll({
    //         limit: perpage,
    //         offset: (( perpage * page ) - perpage),
    //         where: {
    //             active: true,
    //         },
    //         include: 'tva',
    //     });
    // }
};

export default productQuery;