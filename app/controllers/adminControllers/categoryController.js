import categoryQuery from '../../queries/categoryQuery.js';

export default {

    async showAllCategories (_, res) {
        res.render('dashboard/admin/allCategories')
    },

    async addCategoriesAction (req, res) {
        const categoryFound = res.locals.categories.find(cat => cat.title === req.body.title)
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
        const categoryFound = res.locals.allCategories.find(cat => cat.title === req.body.title);
        if(categoryFound){
            res.render('dashboard/admin/updateCategories', { message: 'Ce nom de catégorie est déjà utilisé' });
            return;
        };
        console.log('PARAMS', req.params.category);
        await categoryQuery.updateCategory(req.params.category, req.body);
        res.redirect('/dashboard/admin/categories')
    },

    async unactiveCategory (req, res) {
        await categoryQuery.unactiveCategory(req.params.category);
        res.redirect('/dashboard/admin/categories')
    },

    async activeCategory (req, res) {
        await categoryQuery.activeCategory(req.params.category);
        res.redirect('/dashboard/admin/categories')
    },
}