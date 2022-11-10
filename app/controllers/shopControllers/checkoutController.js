import productQuery from '../../queries/productQuery.js';
import orderQuery from '../../queries/orderQuery.js';
import adressTypeQuery from '../../queries/adressTypeQuery.js';
import OrderTypeAdressQuery from '../../queries/orderTypeAdressQuery.js'


export default {
    async checkoutPage (req, res) {
        res.render('shop/cart/checkout')
    },

    async checkoutAction (req, res) {

        const cart = res.locals.cart

        console.log(req.body)

        const newOrderBody = {
            totalHT: cart.totalHT,
            tax: cart.totalTax,
            totalTTC: cart.totalTTC,
            quantity: cart.quantity,
            user_id: req.session.user.id,
            order_states_id: 1,
        };

        const myOrder = await orderQuery.createOrder(newOrderBody)

        for(const product of cart){
            const productToAdd = await productQuery.getProductByIdCheckout(product.id)
            // await productQuery.updateProductStock(productToAdd, product.qty)
            const thought = {
                quantity: product.qty, 
                priceHT: product.priceHT, 
                TVA: product.tva.title, 
                priceTTC: product.priceTTC,
            }
            await orderQuery.addProductToOrder(myOrder, productToAdd, thought);
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
        

        await OrderTypeAdressQuery.createOrderTypeAdress(shippingBody);
        await OrderTypeAdressQuery.createOrderTypeAdress(billingBody);




        delete req.session.cart;
        res.render('shop/cart/checkoutConfirmation')
    },
};
