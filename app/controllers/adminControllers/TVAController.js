const { Category, Product, TVA } = require("../../models");
const TVAQuery = require("../../queries/TVAQuery");

const TVAController = {

    async showAllTVA (_, res){
        const TVA = await TVAQuery.getAllTVA();
        //TODO ajouter sur cette page le supprimer uniquement pour les TVA sans produits 
        res.render('dashboard/admin/categories', { TVA });

    },

    async addTVAAction (req, res) {
        TVAQuery.createTVA(req.body);
        res.redirect('/dashboard/admin/tva');
    },

    async updateTVAPage (_, res) {
        const TVA = await TVAQuery.getAllTVA();
        res.render('dashboard/admin/updateTVA', { TVA })
    },

    //TODO page ejs, ajouter attention le calcul est fait avec la value
    async updateTVAAction (req, res) {
        const TVAId = parseInt(req.body.TVAId);
        for (const prop in req.body) {
            if (!req.body[prop] || req.body.length === 0) {
                delete req.body[prop]; 
            }
        }
        const TVAToUpdate = await TVAQuery.getTVAById(TVAId);
        await TVAQuery.updateTVA(TVAToUpdate)
        res.redirect('/dashboard/admin/TVA')
    },

    async deleteTVA (req, res) {
        const TVAId = parseInt(req.params.TVAId);
        if(!isNaN(TVAId)){
            const TVAToDelete = await TVAQuery.getTVAById(TVAId);
            await TVAQuery.destroyTVA(TVAToDelete);
            res.redirect('/dashboard/admin/TVA');
        } else {
            next()
        }
    },
};

module.exports = TVAController;