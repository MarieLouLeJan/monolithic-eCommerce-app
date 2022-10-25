const { Category, Product, TVA } = require("../../models");

const TVAController = {

    async showAllTVA (req, res){
        try {
            const TVA = await TVA.findAll({
                include: 'products'
            });
            //TODO ajouter sur cette page le supprimer uniquement pour les TVA sans produits 
            res.render('dashboard/admin/categories', { TVA })
        } catch (error) {
            console.log(error);
            res.locals.error = {
              code: 500,
              text: "Query error"
            }
        }
    },

    async addTVAAction (req, res) {
        try {
            const TVAcreated = await TVA.create({
                name: req.body.name
            })
            res.redirect('/dashboard/admin/tva')
        } catch (error) {
            console.log(error);
            res.locals.error = {
              code: 500,
              text: "Query error"
            }
        }
    },

    async updateTVAPage (req, res) {
        try {
            const TVA = await TVA.findAll();
            res.render('dashboard/admin/updateTVA', { TVA })
        } catch (error) {
            console.log(error);
            res.locals.error = {
              code: 500,
              text: "Query error"
            }
        }    
    },

    //TODO page ejs, ajouter attention le calcul est fait avec la value
    async updateTVAAction (req, res) {
        const TVAId = parseInt(req.body.TVAId);
        try {
            for (const prop in req.body) {
                if (!req.body[prop] || req.body.length === 0) {
                    delete req.body[prop]; 
                }
            }
            const TVAToUpdate = await TVA.findByPk(TVAId);
            await TVAToUpdate.update(req.body)
            res.redirect('/dashboard/admin/TVA')
        } catch (error) {
            console.log(error);
            res.locals.error = {
              code: 500,
              text: "Query error"
            }
        }
    },

    async deleteTVA (req, res) {
        const TVAId = parseInt(req.params.TVAId);
        if(!isNaN(TVAId)){
            try {
                await TVA.destroy({
                    where: { id: TVAId }
                })
                res.redirect('/dashboard/admin/TVA')
            } catch (error) {
                console.log(error);
                res.locals.error = {
                  code: 500,
                  text: "Query error"
                }
            }
        } else {
            next()
        }
    },
};

module.exports = TVAController;