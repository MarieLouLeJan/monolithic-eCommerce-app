import productQuery from '../../queries/productQuery.js';

export default {

    async showAllProducts (_, res) {
        res.render('dashboard/admin/allProducts')
    },

    async showProductDetails (req, res) {
        const productId = parseInt(req.params.productId)
        const product = await productQuery.getProductById(productId)
        product.priceHT = product.priceHT.toFixed(2)
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
        req.body.priceHT = parseFloat(req.body.priceHT);
        await productQuery.createProduct(req.body);
        res.redirect(`/dashboard/admin/products/details/${productCreated.id}`);
    },

    async updateProductPage (req, res) {
        const productId = parseInt(req.params.id);
        const product = await productQuery.getProductById(productId);
        res.render('dashboard/admin/updateProduct', { product })
    },

    async updateProductAction (req, res) {
        const productId = parseInt(req.params.id)
        for (const prop in req.body) if (!req.body[prop] || req.body.length === 0) delete req.body[prop]; 
        if(req.body.priceHT) req.body.priceHT = parseFloat(req.body.priceHT);
        await productQuery.updateProduct(productId, req.body);
        res.redirect(`/dashboard/admin/products/details/${productId}`);
    },

    async unactiveProduct (req, res){
        const productId = parseInt(req.params.id);
        await productQuery.unactiveProduct(productId);
        res.redirect('/dashboard/admin/products');
    },
};