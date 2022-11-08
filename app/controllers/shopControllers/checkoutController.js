const productsQuery = require("../../queries/productsQuery");
const ordersQuery = require("../../queries/ordersQuery");
const adressQuery = require("../../queries/adressQuery");
const adressTypeQuery = require('../../queries/adressTypeQuery');
const { AdressType } = require('../../models');
const OrderTypeAdress = require('../../queries/orderTypeAdressQuery');


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

        // const shippingAdress = await adressQuery.getAdressById(parseInt(req.body.shipping_id));
        // const billingAdress = await adressQuery.getAdressById(parseInt(req.body.billing_id));




        // let adressToShipping = await adressQuery.getAdressTypeAdress(shippingAdress.id, shippingType[0].id)
        // if(adressToShipping.length === 0){
        //     adressToShipping = await adressQuery.addTypeToAdress(shippingType, shippingAdress);
        // }                     
        // let adressToBilling = await adressQuery.getAdressTypeAdress(billingAdress.id, billingType[0].id)
        // if(adressToBilling.length === 0){
        //     adressToBilling = await adressQuery.addTypeToAdress(billingType, billingAdress);
        // }

        // await ordersQuery.addAdressToOrder(adressToShipping[0], myOrder);
        // await ordersQuery.addAdressToOrder(adressToBilling[0], myOrder);

        const shippingType = await adressTypeQuery.getAdressTypeWhere('shipping');
        const billingType = await adressTypeQuery.getAdressTypeWhere('billing');

        const shippingBody = {
            order_id: myOrder.id,
            adress_id: parseInt(req.body.shipping_id),
            adress_type_id: shippingType[0].id
        };

        const billingBody = {
            order_id: myOrder.id,
            adress_id: parseInt(req.body.billing_id),
            adress_type_id: billingType[0].id
        };
        
        await OrderTypeAdress.createOrderTypeAdress(shippingBody);
        await OrderTypeAdress.createOrderTypeAdress(billingBody)

        delete req.session.cart;
        res.render('shop/cart/checkoutConfirmation')
    },
}

module.exports = checkoutController;
