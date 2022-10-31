const pricesCalculation = require('../helpers/pricesCalculation');
const productsQuery = require("../queries/productsQuery");

const cartController = {

    index (req, res) {
        if(!req.session.cart){
            res.render('shop/cart/cart')
        } else {
            //TODO Ici il faut 3 fonctions au lieu d'une dans pricesCalculation
            const { cartHT, cartTTC, cartTax } = pricesCalculation.getAllCartTotals(req.session.cart);
            req.session.cart.totalHT = cartHT;
            req.session.cart.totalTTC = cartTTC;
            req.session.cart.totalTax = cartTax;
            res.render('shop/cart/cart', { cart: req.session.cart }); 
        }
    },

    async addOrUpdate (req, res, next) {
        const productId = parseInt(req.params.productId);
        if(!isNaN(productId)){
            const found = req.session.cart.find(
                prod => prod.id === productId
            );
            if (found) {
                found.qty += 1;
                const { totalHT, totalTTC } = pricesCalculation.getAllProductsTotal(found.priceHT, found.qty, found.tva.value);
                found.totalHT = totalHT;
                found.totalTTC = totalTTC;
                console.log(found)
            } else {
                const productToAdd = await productsQuery.getProductById(productId);
                productToAdd.qty = 1;
                //TODO Ici il faudrait faire 2 fonctions pour faire 2 lignes au lieu de 3
                const { totalHT, totalTTC} = pricesCalculation.getAllProductsTotal(productToAdd.priceHT, productToAdd.qty, productToAdd.tva.value);
                productToAdd.totalHT = totalHT;
                productToAdd.totalTTC = totalTTC;
                req.session.cart.push(productToAdd);
            }
            res.redirect('/cart')
        } else if (isNaN(productId)) {
            next()
        }
    },

    async removeOneProduct (req, res, next) {
        const productId = parseInt(req.params.productId);
        if(!isNaN(productId)){
            const found = req.session.cart.find(
                prod => parseInt(prod.id) === productId
            );
            if (found.qty === 1) {
                const index = req.session.cart.indexOf(found);
                req.session.cart.splice(index, 1)
            } else {
                found.qty -= 1;
                const { totalHT, totalTTC} = pricesCalculation.getAllProductsTotal(found.priceHT, found.qty, found.tva.value);
                found.totalHT = totalHT;
                found.totalTTC = totalTTC;
                console.log(found);
            }
            res.redirect('/cart');
        } else if (isNaN(productId)) {
            next()
        }        
    },

    async removeAllProducts (req, res, next) {
        const productId = parseInt(req.params.productId);
        if(!isNaN(productId)){
            const found = req.session.cart.find(
                prod => parseInt(prod.id) === productId
            );
            const index = req.session.cart.indexOf(found);
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

module.exports = cartController;
