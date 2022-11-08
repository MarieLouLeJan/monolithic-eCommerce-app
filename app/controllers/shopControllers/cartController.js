import productsQuery from '../../queries/productsQuery.js';

export default {

    index (req, res) {
        res.render('shop/cart/cart'); 
    },

    async addOrUpdate (req, res, next) {
        const productId = parseInt(req.params.productId);
        if(isNaN(productId)) next();
        const product = req.session.cart.find(
            prod => prod.id === productId
        );
        if (!product) {
            const product = await productsQuery.getProductById(productId);
            product.qty = 1;
            req.session.cart.push(product);
        } else {
            product.qty += 1;
        }
        res.redirect('/cart')
    },

    async removeOneProduct (req, res, next) {
        const productId = parseInt(req.params.productId);
        if(isNaN(productId)) next()
        const product = req.session.cart.find(
            prod => parseInt(prod.id) === productId
        );
        if (product.qty === 1) {
            const index = req.session.cart.indexOf(product);
            req.session.cart.splice(index, 1)
        } else {
            product.qty -= 1;
        }
        res.redirect('/cart');
    },

    async removeAllProducts (req, res, next) {
        const productId = parseInt(req.params.productId);
        if(!isNaN(productId)){
            const product = req.session.cart.find( prod => parseInt(product.id) === productId );
            const index = req.session.cart.indexOf(product);
            req.session.cart.splice(index, 1)
            res.redirect('/cart');
        } else if (isNaN(productId)) {
            next()
        }        
    },

    destroyCart (req, res) {
        delete req.session.cart;
        res.redirect('/shop');
    },
};
