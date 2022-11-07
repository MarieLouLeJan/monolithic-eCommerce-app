const pricesCalculation = require('../../services/pricesCalculation');
const productsQuery = require("../../queries/productsQuery");
const ordersQuery = require("../../queries/ordersQuery");
const adressQuery = require("../../queries/adressQuery");
const adressTypeQuery = require('../../queries/adressTypeQuery');
const { AdressType } = require('../../models');


const checkoutController = {

    async checkoutPage (req, res) {
        let quantity = 0;
        for(products of req.session.cart){
            quantity = quantity + product.qty;
        }
        req.session.cart.quantity = quantity;
        if(res.locals.user){
            res.locals.user.adresses = await adressQuery.getAllAdressesByUser(req.session.user.id);
        }
        res.render('shop/cart/checkout', { cart: req.session.cart })
    },

    async checkoutAction (req, res) {
        const cart = req.session.cart

        let qty = 0
        for(const p of cart){
            qty = p.qty + qty
        };
        const newOrderBody = {
            totalHT: cart.totalHT,
            tax: cart.totalTax,
            totalTTC: cart.totalTTC,
            quantity: parseInt(qty),
            user_id: req.session.user.id,
            order_states_id: 1,
        };
        const myOrder = await ordersQuery.createOrder(newOrderBody)
        for(const product of cart){
            const productToAdd = await productsQuery.getProductByIdCheckout(product.id)
            const thought = {
                quantity: product.qty, 
                priceHT: product.priceHT, 
                tva: product.tva.value, 
            }
            await ordersQuery.addProductToOrder(myOrder, productToAdd, thought);
        };

        // const shippingAdressId = parseInt(req.body.shipping_id);
        // const billingAdressId = parseInt(req.body.billing_id);

        const shippingAdress = await adressQuery.getAdressById(parseInt(req.body.shipping_id));
        const billingAdress = await adressQuery.getAdressById(parseInt(req.body.billing_id));

        console.log('BILLING', billingBody);
        console.log("SHIPPING", shippingBody)


        const shippingType = await adressTypeQuery.getAdressTypeWhere(shipping);
        const billingType = await adressTypeQuery.getAdressTypeWhere(billing);

        const adressToShipping =  await adressQuery.addAdressToType(shippingAdress, shippingType);
        const adressToBilling =  await adressQuery.addAdressToType(billingAdress, billingType);

        console.log("adressToShipping", adressToShipping);
        console.log("adressToBilling", adressToBilling);

        await ordersQuery.addAdressToOrder(adressToShipping, myOrder);
        await ordersQuery.addAdressToOrder(adressToBilling, myOrder);

        delete req.session.cart;
        res.render('shop/cart/checkoutConfirmation')
    },

    // async getShippingAdressPage (req, res) {
    //     const adresses = await adressQuery.getAllAdressesByUser(req.session.user.id);
    //     if(adresses){
    //         res.render('shop/cart/shippingAdress', { adresses })
    //     } else {
    //         res.render('shop/cart/shippingAdress')
    //     }
    // },

    // async getShippingAdressAction (res, req) {
    //     console.log(req.body);
    //     const shippingAdressId = parseInt(req.body);
    //     const shippingAdress = await adressQuery.getAdressById(req.body);
    //     const condition = "title: shipping"
    //     const adressType = await adressTypeQuery.getAdressTypeWhere(condition);
    //     req.session.shippingId = adressType.id;
    //     req.session.shipping = shippingAdress.id;
    //     console.log(adressType);
    //     console.log(shippingAdress);
    //     res.redirect('/checkout')
    // },
}

module.exports = checkoutController;
