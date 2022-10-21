const { Category, Product, TVA } = require("../../models");


const productController = {

    async showAllProducts (req, res) {
        try {
            const allCategories = await Category.findAll({
                include: [
                    { 
                        model : Product, as: 'products',
                        attributes: ['ref', 'title', 'id']
                    }
                ],
            });
            const categories = allCategories.map(cat => cat.get( { plain: true } ))
            res.render('dashboard/admin/allProducts', { categories, user: req.session.user })
        } catch (error) {
            console.log(error);
            res.locals.error = {
              code: 500,
              text: "Query error"
            }
        }
    },

    async showProductDetails (req, res) {
        req.session.user = {
            id: 2,
            name: 'Maurice Admin',
            email: 'admin@admin.com',
            role_id: 2,
            phone: null,
            shipping: null,
            billing: null,
            created_at: '2022-10-18',
            updated_at: null,
            role: { id: 2, name: 'admin', created_at: '2022-10-18', updated_at: null }
        };
        const productId = parseInt(req.params.productId)
        if(!isNaN(productId)){
            try {
                const product = await Product.findByPk(productId, {
                    include: [
                        'tva',
                        'categories'
                    ],
                })
                product.priceHT = product.priceHT.toFixed(2)
                console.log(product.priceHT)
                res.render('dashboard/admin/productDetails', { product, user: req.session.user })
            } catch (error) {
                console.log(error);
                res.locals.error = {
                  code: 500,
                  text: "Query error"
                }
            }
        } else if (isNaN(productId)) {
            next()
        }
    },

    async deleteProductAction (req, res){
        const productId = parseInt(req.params.productId);
        try {
            const productToDelete = await Product.findByPk(productId);
            await productToDelete.destroy();
            res.redirect('/dashboard/admin/products')
        } catch (error) {
            console.log(error);
            res.locals.error = {
              code: 500,
              text: "Query error"
            }
        }
    },

    async addProductPage (req, res) {
        try {
            const categories = await Category.findAll()
            const tva = await TVA.findAll()
            res.render('dashboard/admin/addProduct', { categories, tva, user: req.session.user })

        } catch (error) {
            console.log(error);
            res.locals.error = {
              code: 500,
              text: "Query error"
            }
        }
    },

    async addProductAction (req, res) {
        try {
            req.body.priceHT = parseFloat(req.body.priceHT)
            const productCreated = await Product.create(req.body)
            res.redirect(`/dashboard/admin/products/details/${productCreated.id}`)
        } catch (error) {
            console.log(error);
            res.locals.error = {
              code: 500,
              text: "Query error"
            }
        }
    },

    async updateProductPage (req, res) {
        const productId = parseInt(req.params.productId)
        if(!isNaN(productId)){
            try {
                const product = await Product.findByPk(productId, {
                    include: [
                        'tva',
                        'categories'
                    ],
                })
                const tva = await TVA.findAll({
                })
                const categories = await Category.findAll({
                })
                res.render('dashboard/admin/updateProduct', { product, tva, categories, user: req.session.user })
            } catch (error) {
                console.log(error);
                res.locals.error = {
                  code: 500,
                  text: "Query error"
                }
            }
        } else if (isNaN(productId)) {
            next()
        }
    },

    async updateProductAction (req, res) {
        const productId = parseInt(req.params.productId)
        for (const prop in req.body) {
            if (!req.body[prop] || req.body.length === 0) {
                delete req.body[prop]; 
            }
        }
        if(req.body.priceHT){
            req.body.priceHT = parseFloat(req.body.priceHT)
        }
        try {
            const productToUpdate = await Product.findByPk(productId);
            await productToUpdate.update(req.body);
            res.redirect(`/dashboard/admin/products/details/${productId}`)
        } catch (error) {
            console.log(error);
            res.locals.error = {
              code: 500,
              text: "Query error"
            }
        }
    }
};

module.exports = productController