import orderQuery from './app/queries/orderQuery.js';


const products = await orderQuery.getAllProductsByOrder(1);

console.log(products)

