import productQuery from "../../queries/productQuery.js";
import pricesCalculation from "../../services/pricesCalculation.js";
import categoryQuery from "../../queries/categoryQuery.js";
import NotFoundError from "../../helpers/NotFoundError.js";

export default {

    async index (_, res) {
        res.render('shop/index')
    },

    async search (req, res) {
        const productsFound = await productQuery.getProductsBySearch(req.query.search);
        for(const product of productsFound){
            product.priceTTC = pricesCalculation.getProductTTC(product.priceHT, product.tva.value);
            product.priceHT = product.priceHT.toFixed(2)
        };
        res.render('shop/product/search', { productsFound })
    },

    async productsList (req, res) {
        const perPage = 2;
        const current = req.params.page
    
        const allProducts = await productQuery.getAndCountAllProducts(perPage, current);
        const products = allProducts.rows.map(prod => prod.get( { plain: true } ));
        const pages = Math.ceil(allProducts.count/perPage) 
    
        for(const product of products){
            product.priceTTC = pricesCalculation.getProductTTC(product.priceHT, product.tva.value);
            product.priceHT = product.priceHT.toFixed(2)
        };
        res.render('shop/product/allProducts', { current, pages, products });
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

    async productDetails (req, res) {
        const product = await productQuery.getProductById(req.params.product)
        product.priceTTC = pricesCalculation.getProductTTC(product.priceHT, product.tva.value);
        product.priceHT = product.priceHT.toFixed(2);
        res.render('shop/product/productDetails', { product });
    },
};
