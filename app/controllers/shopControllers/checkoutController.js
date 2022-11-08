const productsQuery = require("../../queries/productsQuery");
const ordersQuery = require("../../queries/ordersQuery");
const adressQuery = require("../../queries/adressQuery");
const adressTypeQuery = require('../../queries/adressTypeQuery');
const { AdressType } = require('../../models');
const OrderTypeAdress = require('../../queries/orderTypeAdressQuery');


export default {
    async checkoutPage (req, res) {
        res.render('shop/cart/checkout')
    },

    async checkoutAction (req, res) {

        const cart = res.locals.cart

        const newOrderBody = {
            totalHT: cart.totalHT,
            tax: cart.totalTax,
            totalTTC: cart.totalTTC,
            quantity: cart.quantity,
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
        
<<<<<<< HEAD
        await OrderTypeAdress.createOrderTypeAdress(shippingBody);
        await OrderTypeAdress.createOrderTypeAdress(billingBody)
=======
        await OrderTypeAdress.addOrderTypeAdress(shippingBody);
        await OrderTypeAdress.addOrderTypeAdress(billingBody);

>>>>>>> ed12e05c8f024af079734d3d0fae436a40cb1123

        delete req.session.cart;
        res.render('shop/cart/checkoutConfirmation')
    },
};
