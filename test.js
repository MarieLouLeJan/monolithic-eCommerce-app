const productsQuery = require("./app/queries/productsQuery");

async function getproducts () {
    const products = await productsQuery.getAllProducts();
    console.log(products)
}

getproducts()
