export default {

    async index (_, res) {
        res.render('shop/index')
    },

    async productsList (_, res) {
        res.render('shop/product/allProducts');
    },

    async productsByCategory (req, res) {
        res.render('shop/product/productByCategory');
    },

    async productDetails (_, res) {
        res.render('shop/product/productDetails');
    },
};
