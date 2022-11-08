import categoriesQuery from '../../queries/categoriesQuery.js';
import productsQuery from '../../queries/productsQuery.js';
import TVAQuery from '../../queries/TVAQuery.js';

export default {

    async showAllProducts (_, res) {
        const allCategories = await categoriesQuery.getAllCategories();
        const categories = allCategories.map(cat => cat.get( { plain: true } ))
        res.render('dashboard/admin/allProducts', { categories })
    },

    async showProductDetails (req, res) {
        const productId = parseInt(req.params.productId)
        if(isNaN(productId)) next();         
        const product = await productsQuery.getProductById(productId)
        product.priceHT = product.priceHT.toFixed(2)
        res.render('dashboard/admin/productDetails', { product });
        return;
    },

    async addProductPage (_, res) {
        const categories = await categoriesQuery.getAllCategories();
        const tva = await TVAQuery.getAllTVA();
        res.render('dashboard/admin/addProduct', { categories, tva });
    },

    async addProductAction (req, res) {
        const products = productsQuery.getAllProducts();
        const productFound = products.find(product => product.ref === req.body.ref);
        if(productFound){
            const message = "Ce produit existe déjà";
            res.render('dashboard/admin/addProduct', { message });
        }
        req.body.priceHT = parseFloat(req.body.priceHT);
        await productsQuery.createProduct(req.body);
        res.redirect(`/dashboard/admin/products/details/${productCreated.id}`);
    },

    async updateProductPage (req, res) {
        const productId = parseInt(req.params.productId);
        if(isNaN(productId)) next();
        const product = await productsQuery.getProductById(productId);
            const tva = await TVAQuery.getAllTVA();
            const categories = await categoriesQuery.getAllCategories();
            res.render('dashboard/admin/updateProduct', { product, tva, categories })
            return

    },

    async updateProductAction (req, res) {
        const productId = parseInt(req.params.productId)
        for (const prop in req.body) {
            if (!req.body[prop] || req.body.length === 0) {
                delete req.body[prop]; 
            }
        }
        if(req.body.priceHT){
            req.body.priceHT = parseFloat(req.body.priceHT);
        }
        await productsQuery.updateProduct(productId, req.body);
        res.redirect(`/dashboard/admin/products/details/${productId}`);
    },

    async unactiveProduct (req, res){
        const productId = parseInt(req.params.productId);
        if(isNaN(productId)) next();
        const productToDelete = await productsQuery.getProductById(productId);
        await productsQuery.destroyProduct(productToDelete);
        res.redirect('/dashboard/admin/products');
    },
};