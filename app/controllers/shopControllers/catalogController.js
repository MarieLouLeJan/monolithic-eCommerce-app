import productQuery from "../../queries/productQuery.js";
import pricesCalculation from "../../services/pricesCalculation.js";
import categoryQuery from "../../queries/categoryQuery.js";
import NotFoundError from "../../helpers/NotFoundError.js";

export default {

    async index (_, res) {
        res.render('shop/index')
    },

    async search (req, res) {
        console.log("COUPE ICI LAAAAAA")

        const productsFound = await productQuery.getProductsBySearch(req.query.search);
        console.log("COUPE ICI LAAAAAA")
        for(const product of productsFound){
            product.priceTTC = pricesCalculation.getProductTTC(product.priceHT, product.tva.value);
            product.priceHT = product.priceHT.toFixed(2)
        };
        res.render('shop/product/search', { productsFound })
    },

    async productsList (req, res) {
    
        const products = await productQuery.getAllActiveProducts()

        for(const product of products){
            product.priceTTC = pricesCalculation.getProductTTC(product.priceHT, product.tva.value);
            product.priceHT = product.priceHT.toFixed(2)
        };
        res.render('shop/product/allProducts', { products });
    },


    async productsByCategory (req, res, next) {
        const category = await categoryQuery.getCategoryById(req.params.category)
        if(!category) {
            next(new NotFoundError(`Cette catégory n'existe pas/plus`))
            return
        };
        for(const product of category.products){
            product.priceTTC = pricesCalculation.getProductTTC(product.priceHT, product.tva.value);
            product.priceHT = product.priceHT.toFixed(2)
        }

        res.render('shop/product/productByCategory', { category });
    },

    async productDetails (req, res, next) {
        const product = await productQuery.getProductById(req.params.product);
        if(product.active === false) next(new NotFoundError(`Ce produit n'existe pas/plus`))
        product.priceTTC = pricesCalculation.getProductTTC(product.priceHT, product.tva.value);
        product.priceHT = product.priceHT.toFixed(2);
        const reviews = await productQuery.getReviewsByProduct(req.params.product)
        res.render('shop/product/productDetails', { product, reviews });
    },

    async addReviewPage (req, res) {
        const product = await productQuery.getProductById(req.params.product);
        console.log(product)
        if(product.active === false) next(new NotFoundError(`Ce produit n'existe pas/plus`))
        res.render('shop/product/addReview', { product })
    },

    async addReviewAction (req, res) {
        const product = await productQuery.getProductById(req.params.product);
        console.log("BODY", req.body)
        const review = await productQuery.addReviewToProduct(req.body)
        console.log("MY REVIEW", review)
        res.redirect(`/shop/product/${req.params.product}`)
    }
};
