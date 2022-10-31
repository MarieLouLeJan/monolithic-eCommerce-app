const pricesCalculation = require('../helpers/pricesCalculation');
const productsQuery = require("../queries/productsQuery");
const ordersQuery = require("../queries/ordersQuery");

const checkoutController = {

    checkoutPage (req, res) {
        if(!req.session.user){
            const message = "Veuillez vous connecter pour procéder au checkout"
            res.render('user/signin', { message })
        }
        //TODO changer les fonctions ici & dans pricesCalculation
        const user = req.session.user;
        const cart = req.session.cart;
        const { cartHT, cartTTC, cartTax } = pricesCalculation.getAllCartTotals(cart)
        res.render('shop/cart/checkout', {cart, cartHT, cartTTC, cartTax, user})
    },

    async checkoutAction (req, res) {
        // const cart = req.session.cart;
        // const user = req.session.user
        const { cartHT, cartTTC, cartTax } = pricesCalculation.getAllCartTotals(cart)
        let quantity = 0
        for(const p of cart){
            quantity = p.qty + quantity
        }
        const newOrderBody = {
            totalHT: cartHT,
            tax: cartTax,
            totalTTC: cartTTC,
            user_id: user.id,
            adress: user.shipping,
            state: "en cours de livraison",
            quantity: quantity
        }
        const order = await ordersQuery.createOrder(newOrderBody)
        for(const product of req.session.cart){
            const productToAdd = await productsQuery.getProductById(product.id)
            const productToAddBody = {
                quantity: product.qty, 
                priceHT: product.priceHT, 
                tva: product.tva.title, 
                state: "en cours de livraison"
            }
            await ordersQuery.addProductToOrder(order, productToAdd, productToAddBody);
        };
        delete req.session.cart;
        res.render('shop/cart/checkoutConfirmation')
    },
}

module.exports = checkoutController;
