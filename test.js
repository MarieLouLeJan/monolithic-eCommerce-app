const ordersQuery = require("./app/queries/ordersQuery");
const productsQuery = require("./app/queries/productsQuery");

async function getorder () {
    const products = await ordersQuery.getOrderById(7);
    console.log(products)
}

getorder()
