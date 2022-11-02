const pricesCalculation = {
    getProductTTC: (HT, TVA) => {
        let totalTTC = (HT * TVA) + HT;
        totalTTC = Math.round(totalTTC * 100)/100;
        return totalTTC.toFixed(2)
    },

    getAllProductsTotal: (HT, qty, TVA) => {
        const totalProduct = []
        let totalHT = HT * qty;
        totalProduct.totalHT = totalHT.toFixed(2);
        let totalTTC = Math.round((pricesCalculation.calculProductTTC(HT, TVA) * qty) * 100) / 100
        totalProduct.totalTTC = totalTTC.toFixed(2);
        return totalProduct
    },

    getCartHT: (cart) => {
        let totalHT = 0
        for(const product of cart){
            totalHT = product.priceHT * product.qty + totalHT
        }
        return totalHT.toFixed(2)      
    },

    getCartTTC: (cart) => {
        let totalTTCProduct = 0
        for(const product of cart){
            totalTTCProduct = product.totalTTC + totalTTCProduct
            }
            totalTTCProduct = Math.round(totalTTCProduct)
        return totalTTCProduct.toFixed(2)
    },

    getCartTaxes: (TTC, HT) => {
        let totalTVA = Math.round((TTC - HT))
        return totalTVA.toFixed(2)
    },

    getAllCartTotals: (cart) => {
        const myTotals = {};
        myTotals.cartHT = pricesCalculation.calculCartHT(cart);
        myTotals.cartTTC = pricesCalculation.calculCartTTC(cart);
        myTotals.cartTax = pricesCalculation.calculCartTax(myTotals.cartTTC, myTotals.cartHT);
        return myTotals
    }
};

module.exports = pricesCalculation