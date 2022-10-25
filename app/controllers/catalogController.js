const { Category, Product, Tva } = require('../models');
const pricesCalculation = require('../middlewares/pricesCalculation')

const catalogController = {

    async index (req, res) {
        res.render('shop/index')
    },

    async productsList (req, res) {
        try {
            const products = await Product.findAll({
                include: 'tva',
                raw: true,
                nest: true
            });
            const categories = await Category.findAll();
            for(const product of products){
                product.priceTTC = pricesCalculation.calculProductTTC(product.priceHT, product.tva.value);
                product.priceHT = product.priceHT.toFixed(2)
            }
            res.render('shop/product/allProducts', { categories, products });
        } catch (error) {
            console.log(error);
            res.locals.error = {
              code: 500,
              text: "Query error"
            }
        }
    },

    async productsByCategory (req, res, next) {
        const categoryId = parseInt(req.params.id);
        if(!isNaN(categoryId)){
            try {
                const category = await Category.findByPk(categoryId, {
                    include: [
                        { 
                            model : Product, as: 'products',
                            include: ['tva'],
                            raw: true,
                            nest: true
                        }
                    ]
                })
                for(const product of category.products){
                    product.priceTTC = pricesCalculation.calculProductTTC(product.priceHT, product.tva.value);
                    product.priceHT = product.priceHT.toFixed(2)
                }
                const categories = await Category.findAll()
                res.render('shop/product/productByCategory', { category, categories });
            } catch (error) {
                console.log(error);
                res.locals.error = {
                  code: 500,
                  text: "Query error"
                }
            }
        } else if (isNaN(categoryId)) {
            next()
        }
    },

    async productDetails (req, res, next) {
        const productId = parseInt(req.params.id);
        if(!isNaN(productId)){
            try {
                const product = await Product.findByPk(productId, {
                    include: "tva"
                })
                const priceTTC = pricesCalculation.calculProductTTC(product.priceHT, product.tva.value)
                res.render('shop/product/productDetails', { product, priceTTC });
            } catch (error) {
                console.log(error);
                res.locals.error = {
                  code: 500,
                  text: "Query error"
                }
            }
        } else if (isNaN(productId)) {
            next()
        }
    },
};

module.exports = catalogController;
