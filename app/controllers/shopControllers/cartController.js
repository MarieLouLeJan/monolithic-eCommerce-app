import productQuery from '../../queries/productQuery.js';

export default {

    index (req, res) {
        res.render('shop/cart/cart'); 
    },

    async addOrUpdate (req, res, next) {
        const product = req.session.cart.find( prod => prod.id === req.params.id );
        if (!product) {
            res.locals.product.qty = 1;
            req.session.cart.push(res.locals.product);
        } else {
            product.qty += 1;
        }
        res.redirect('/cart')
    },

    async removeOneProduct (req, res, next) {
        const product = req.session.cart.find( prod => parseInt(prod.id) === req.params.id );
        if (product.qty === 1) {
            const index = req.session.cart.indexOf(product);
            req.session.cart.splice(index, 1)
        } else {
            product.qty -= 1;
        }
        res.redirect('/cart');
    },

    async removeAllProducts (req, res, next) {
        const product = req.session.cart.find( prod => parseInt(prod.id) === req.params.id );
        const index = req.session.cart.indexOf(product);
        req.session.cart.splice(index, 1)
        res.redirect('/cart');
   
    },

    destroyCart (req, res) {
        delete req.session.cart;
        res.redirect('/shop');
    },
};
