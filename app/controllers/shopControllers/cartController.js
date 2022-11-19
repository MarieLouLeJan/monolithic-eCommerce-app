import productQuery from '../../queries/productQuery.js';

export default {

    async index (req, res) {
        res.render('shop/cart/cart'); 
    },

    async addOrUpdate (req, res, next) {
        const product = req.session.cart.find( prod => prod.id === req.params.product );
        if (!product) {
            const productToAdd = await productQuery.getProductById(req.params.product);
            const product = productToAdd.get({ plain: true })
            product.qty = 1;
            req.session.cart.push(product);
        } else {
            product.qty += 1;
        }
        res.redirect('/cart')
    },

    async removeOneProduct (req, res) {
        const product = req.session.cart.find( prod => parseInt(prod.id) === req.params.product);
        if (product.qty === 1) {
            const index = req.session.cart.indexOf(product);
            req.session.cart.splice(index, 1)
        } else {
            product.qty -= 1;
        }
        res.redirect('/cart');
    },

    async removeAllProducts (req, res, next) {
        const product = req.session.cart.find( prod => parseInt(prod.id) === req.params.product );
        const index = req.session.cart.indexOf(product);
        req.session.cart.splice(index, 1)
        res.redirect('/cart');
   
    },

    destroyCart (req, res) {
        delete req.session.cart;
        res.redirect('/');
    },
};
