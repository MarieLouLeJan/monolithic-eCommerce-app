const pricesCalculation = require('../services/pricesCalculation');
const productsQuery = require("../queries/productsQuery");
const categoriesQuery = require("../queries/categoriesQuery")

const catalogController = {

    async index (_, res) {
        res.render('shop/index')
    },

    async productsList (_, res) {
        const products = await productsQuery.getAllProducts();
        const categories = await categoriesQuery.getAllCategories();
        for(const product of products){
            console.log(product)
            product.priceTTC = pricesCalculation.calculProductTTC(product.priceHT, product.tva.value);
            product.priceHT = product.priceHT.toFixed(2)
        }
        res.render('shop/product/allProducts', { categories, products });
    },

    async productsByCategory (req, res, next) {
        const categoryId = parseInt(req.params.id);
        if(!isNaN(categoryId)){
            const category = await categoriesQuery.getCategoryById(categoryId)
            for(const product of category.products){
                product.priceTTC = pricesCalculation.calculProductTTC(product.priceHT, product.tva.value);
                product.priceHT = product.priceHT.toFixed(2)
            }
            const categories = await categoriesQuery.getAllCategories();
            res.render('shop/product/productByCategory', { category, categories });

        } else if (isNaN(categoryId)) {
            next()
        }
    },

    async productDetails (req, res, next) {
        const productId = parseInt(req.params.id);
        if(!isNaN(productId)){
            const product = await productsQuery.getProductById(productId)
            const priceTTC = pricesCalculation.calculProductTTC(product.priceHT, product.tva.value)
            res.render('shop/product/productDetails', { product, priceTTC });
        } else if (isNaN(productId)) {
            next()
        }
    },
};

module.exports = catalogController;
