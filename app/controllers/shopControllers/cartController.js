import productQuery from '../../queries/productQuery.js';

export default {

    async index (req, res) {
        let check = await productQuery.getById(4);
        check = check.get({plain: true})
        console.log(check.stock)
        res.render('shop/cart/cart'); 
    },

    async addOrUpdate (req, res, next) {
        const product = req.session.cart.find( prod => prod.id === req.params.id );
        if (!product) {
            res.locals.product.qty = 1;
            await productQuery.removeFromStock(res.locals.product.id, 1);
            req.session.cart.push(res.locals.product);
        } else {
            const checkProduct = await productQuery.getById(product.id)
            console.log(checkProduct)
            if(checkProduct.stock <= 0){
                res.render('shop/cart/cart', { message: 'Non n\'avons plus suffisament de produit en stock'});
                return
            }
            product.qty += 1;
            await productQuery.removeFromStock(res.locals.product.id, 1);
        }
        res.redirect('/cart')
    },

    async removeOneProduct (req, res, next) {
        const product = req.session.cart.find( prod => parseInt(prod.id) === req.params.id);
        if (product.qty === 1) {
            const index = req.session.cart.indexOf(product);
            await productQuery.addToStock(res.locals.product.id, 1);
            req.session.cart.splice(index, 1)
        } else {
            await productQuery.addToStock(res.locals.product.id, 1);
            product.qty -= 1;
        }
        res.redirect('/cart');
    },

    async removeAllProducts (req, res, next) {
        const product = req.session.cart.find( prod => parseInt(prod.id) === req.params.id );
        await productQuery.addToStock(res.locals.product.id, product.qty);
        const index = req.session.cart.indexOf(product);
        req.session.cart.splice(index, 1)
        res.redirect('/cart');
   
    },

    destroyCart (req, res) {
        req.session.cart.forEach(async prod => {
            const product = productQuery.getById(prod.id);
            await productQuery.addToStock(product.id, prod.qty)
        });
        delete req.session.cart;
        res.redirect('/shop');
    },
};
