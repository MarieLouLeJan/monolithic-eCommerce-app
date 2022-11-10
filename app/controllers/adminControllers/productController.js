import productQuery from '../../queries/productQuery.js';

export default {

    async showAllProducts (_, res) {
        res.render('dashboard/admin/allProducts')
    },

    async showProductDetails (req, res) {
        console.log(res.locals.product);
        res.render('dashboard/admin/productDetails');
    },

    async addProductPage (_, res) {
        res.render('dashboard/admin/addProduct');
    },

    async addProductAction (req, res) {
        const productFound = res.locals.products.find(product => product.ref === req.body.ref);
        if(productFound){
            res.render('dashboard/admin/addProduct', { message: "Ce produit existe déjà" });
            return;
        }
        req.body.priceHT = parseFloat(req.body.priceHT);
        await productQuery.createProduct(req.body);
        res.redirect(`/dashboard/admin/products/details/${productCreated.id}`);
    },

    async updateProductPage (req, res) {
        res.render('dashboard/admin/updateProduct')
    },

    async updateProductAction (req, res) {
        for (const prop in req.body) if (!req.body[prop] || req.body.length === 0) delete req.body[prop]; 
        if(req.body.priceHT) req.body.priceHT = parseFloat(req.body.priceHT);
        await productQuery.updateProduct(req.params.id, req.body);
        res.redirect(`/dashboard/admin/products/details/${req.params.id}`);
    },

    async unactiveProduct (req, res){
        await productQuery.unactiveProduct(res.locals.product);
        res.redirect(`/dashboard/admin/products/details/${req.params.id}`);
    },

    async activeProduct (req, res){
        await productQuery.activeProduct(res.locals.product);
        res.redirect(`/dashboard/admin/products/details/${req.params.id}`);
    },
};