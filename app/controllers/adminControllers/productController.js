const { Category, Product, TVA } = require("../../models");
const categoriesQuery = require("../../queries/categoriesQuery");
const productsQuery = require("../../queries/productsQuery");
const TVAQuery = require("../../queries/TVAQuery");

const productController = {

    async showAllProducts (_, res) {
        const allCategories = await categoriesQuery.getAllCategories();
        const categories = allCategories.map(cat => cat.get( { plain: true } ))
        res.render('dashboard/admin/allProducts', { categories })
    },

    async showProductDetails (req, res) {
        const productId = parseInt(req.params.productId)
        if(!isNaN(productId)){
            const product = await productsQuery.getProductById(productId)
            product.priceHT = product.priceHT.toFixed(2)
            res.render('dashboard/admin/productDetails', { product })
        } else if (isNaN(productId)) {
            next()
        }
    },

    async addProductPage (_, res) {
        const categories = await categoriesQuery.getAllCategories();
        const tva = await TVAQuery.getAllTVA();
        res.render('dashboard/admin/addProduct', { categories, tva });
    },

    async addProductAction (req, res) {
        req.body.priceHT = parseFloat(req.body.priceHT);
        await productsQuery.createProduct(req.body);
        res.redirect(`/dashboard/admin/products/details/${productCreated.id}`);
    },

    async updateProductPage (req, res) {
        const productId = parseInt(req.params.productId)
        if(!isNaN(productId)){
            const product = await productsQuery.getProductById(productId)
            const tva = await TVAQuery.getAllTVA();
            const categories = await categoriesQuery.getAllCategories();
            res.render('dashboard/admin/updateProduct', { product, tva, categories })
        } else if (isNaN(productId)) {
            next()
        }
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
        const productToUpdate = await productsQuery.getProductById(productId);
        await productsQuery.updateProduct(req.body);
        res.redirect(`/dashboard/admin/products/details/${productId}`);

    },

    async deleteProductAction (req, res){
        const productId = parseInt(req.params.productId);
        const productToDelete = await productsQuery.getProductById(productId);
        await productsQuery.destroyProduct(productToDelete);
        res.redirect('/dashboard/admin/products');
    },
};

module.exports = productController