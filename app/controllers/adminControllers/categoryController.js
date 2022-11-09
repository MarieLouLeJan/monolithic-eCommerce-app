import categoryQuery from '../../queries/categoryQuery.js';

export default {

    async showAllCategories (_, res) {
        res.render('dashboard/admin/allCategories', { categories })
    },

    async addCategoriesAction (req, res) {
        req.body.created_by = req.session.user.id;
        const categoryFound = res.locals.categories.find(cat => cat.name === req.body.name)
        if(categoryFound){
            res.render('dashboard/admin/allCategories', { message: 'Cette catégorie existe déjà' });
            return;
        };
        await categoryQuery.createCategory(req.body)
        res.redirect('/dashboard/admin/categories')
    },

    async updateCategoriesPage (_, res) {
        res.render('dashboard/admin/updateCategories')
    },

    async updateCategoriesAction (req, res) {
        const categoryFound = res.locals.categories.find(cat => cat.name === req.body.name);
        if(categoryFound){
            res.render('dashboard/admin/updateCategories', { message: 'Ce nom de catégorie est déjà utilisé' });
            return;
        }
        await categoryQuery.updateCategory(categoryToUpdate, req.body);
        res.redirect('/dashboard/admin/categories')
    },

    async unactiveCategory (_, res) {
        await categoryQuery.unactiveCategory(categoryId);
        res.redirect('/dashboard/admin/categories')
    },
}