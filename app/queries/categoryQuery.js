import { Model } from 'sequelize';
import { Category, Product, TVA } from '../models/index.js';
import { Op } from "sequelize";


const categoryQuery = {

    async getAllCategories () {
        return await Category.findAll({
            include: 'products',
        });
    },

    async getAllActiveCategories () {
        return await Category.findAll({
            include: 'products',
            where: {
                active: true
            }
        });
    },

    async getAllActiveNotEmptyCategories () {
        return await Category.findAll({
            include: [{
                model : Product, as: 'products',
                where: { active: true }
        }],
            where: {
                active: true
            }
        });
    },

    // async getCategoryBySearch (search) {
    //     return await Category.findAll({ 
    //         where: [
    //             { title: { [Op.iLike]: '%' + search + '%' } },
    //             { active: true }
    //         ],
    //         include: [
    //             { 
    //                 model: Product, as: "products",
    //                 where: {active: true},
    //                 include: [
    //                     { model: TVA, as: "tva" }
    //                 ]
    //             } 
    //         ],
    //     });
    // },

    
    async getAllUnactiveCategories () {
        return await Category.findAll({
            include: 'products',
            where: {
                active: false
            }
        });
    },

    async getCategoryById (id) {
        return await Category.findByPk(id, {
            include: [
                { 
                    model : Product, as: 'products',
                    include: ['tva'],
                    where: { active: true, },
                    raw: true,
                    nest: true
                }
            ]
        });
    },

    async getCategoryByIdAdmin (id) {
        return await Category.findByPk(id)
    },

    async createCategory (body) {
        await Category.create(body)
    },

    async updateCategory (id, body){
        const category = await Category.findByPk(id);
        console.log("MYCAT", category)
        await category.update(body);
    },

    async unactiveCategory (id) {
        const category  = await categoryQuery.getCategoryByIdAdmin(id);
        console.log('ICI', category)
        category.active = false;
        await category.save();
    },

    async activeCategory (id) {
        const category  = await categoryQuery.getCategoryByIdAdmin(id);
        category.active = true;
        await category.save();
    }
};

export default categoryQuery;