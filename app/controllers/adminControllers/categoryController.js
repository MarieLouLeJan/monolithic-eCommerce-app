const { Category, Product, TVA } = require("../../models");

const categoryController = {

    async showAllCategories (req, res) {
        try {
            const categories = await Category.findAll();
            res.render('dashboard/admin/categories', { categories, user: req.session.user})
        } catch (error) {
            console.log(error);
            res.locals.error = {
              code: 500,
              text: "Query error"
            }
        }
    },

    async addCategoriesAction (req, res) {
        try {
            const categoryCreated = await Category.create({
                name: req.body.name
            })
            res.redirect('/dashboard/admin/categories')
        } catch (error) {
            console.log(error);
            res.locals.error = {
              code: 500,
              text: "Query error"
            }
        }
    },

    async updateCategoriesPage (req, res) {
        try {
            const categories = await Category.findAll();
            res.render('dashboard/admin/updateCategories', { categories, user: req.session.user })
        } catch (error) {
            console.log(error);
            res.locals.error = {
              code: 500,
              text: "Query error"
            }
        }    
    },

    async updateCategoriesAction (req, res) {
        const categoryId = parseInt(req.body.categoryId);
        try {
            const categoryToUpdate = await Category.findByPk(categoryId);
            categoryToUpdate.name = req.body.name;
            await categoryToUpdate.save()
            res.redirect('/dashboard/admin/categories')
        } catch (error) {
            console.log(error);
            res.locals.error = {
              code: 500,
              text: "Query error"
            }
        }
    },

    async deleteCategory (req, res) {
        try {
            const categoryId = parseInt(req.params.categoryId);
            await Product.destroy({
                where: {category_id: categoryId}
            })
            await Category.destroy({
                where: {id: categoryId}
            })
            res.redirect('/dashboard/admin/categories')
        } catch (error) {
            console.log(error);
            res.locals.error = {
              code: 500,
              text: "Query error"
            }
        }
    },
}

module.exports = categoryController