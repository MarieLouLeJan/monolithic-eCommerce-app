import orderQuery from './app/queries/orderQuery.js';


const products = await orderQuery.getAllProductsByOrder(1);

console.log(products)

    async  getusers () {
        const users = await usersQuery.getAllUsersByRole("admin")
        console.log(users)
    },
}

console.log(getRole.getusers())
