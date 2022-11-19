import productQuery from '../../queries/productQuery.js';

export default {

    async showAllProducts (_, res) {
        res.render('dashboard/admin/allProducts')
    },

    async showProductDetails (req, res) {
        const product = await productQuery.getProductById(req.params.product)
        res.render('dashboard/admin/productDetails', { product });
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
        await productQuery.createProduct(req.body);
        res.redirect(`/dashboard/admin/products`);
    },

    async updateProductPage (req, res) {
        const product = await productQuery.getProductById(req.params.product)
        res.render('dashboard/admin/updateProduct', { product })
    },

    async updateProductAction (req, res) {
        for(const prop in req.body) if(!req.body[prop] || req.body.length === 0) delete req.body[prop]; 
        if(req.body.priceHT) req.body.priceHT = parseFloat(req.body.priceHT);
        await productQuery.updateProduct(req.params.product, req.body);
        res.redirect(`/dashboard/admin/products/details/${req.params.product}`);
    },

    async unactiveProduct (req, res){
        await productQuery.unactiveProduct(req.params.product);
        res.redirect(`/dashboard/admin/products/details/${req.params.product}`);
    },

    async activeProduct (req, res){
        await productQuery.activeProduct(req.params.product);
        res.redirect(`/dashboard/admin/products/details/${req.params.product}`);
    },
};