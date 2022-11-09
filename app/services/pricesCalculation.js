const pricesCalculation = {

    getProductTTC: (HT, TVA) => {
        let totalTTC = (HT * TVA) + HT;
        totalTTC = Math.round(totalTTC * 100)/100;
        return totalTTC.toFixed(2);
    },

    getAllProductsTotal: (HT, qty, TVA) => {
        const totalProduct = []
        let totalHT = HT * qty;
        totalProduct.totalHT = totalHT.toFixed(2);
        let totalTTC = Math.round((pricesCalculation.getProductTTC(HT, TVA) * qty) * 100) / 100
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
        let totalTTC = 0
        for(const product of cart){
            totalTTC = parseFloat(product.totalTTC) + totalTTC
        }
        return totalTTC.toFixed(2)
    },

    getCartTaxes: (TTC, HT) => {
        let totalTVA = TTC - HT
        totalTVA = Math.round(totalTVA)
        return totalTVA.toFixed(2)
    },

    getAllCartTotals: (cart) => {
        const myTotals = {};
        myTotals.cartHT = pricesCalculation.getCartHT(cart);
        myTotals.cartTTC = pricesCalculation.getCartTTC(cart);
        myTotals.cartTax = pricesCalculation.getCartTaxes(myTotals.cartTTC, myTotals.cartHT);
        return myTotals
    }
};

export default pricesCalculation