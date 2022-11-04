const TVAQuery = require("../../queries/TVAQuery");

const TVAController = {

    async showAllTVA (_, res){
        const TVA = await TVAQuery.getAllTVA();
        //TODO ajouter sur cette page le supprimer uniquement pour les TVA sans produits 
        res.render('dashboard/admin/tva', { TVA });
    },

    async addTVAAction (req, res) {
        const TVAs = TVAQuery.getAllTVA();
        const TVAFound = TVAs.find(tva => tva.value === req.body.value);
        if(TVAFound){
            const message = 'TVA déjà existante';
            res.render('dashboard/admin/tva', { TVAs, message });
            return;
        }
        TVAQuery.createTVA(req.body);
        res.redirect('/dashboard/admin/tva');
    },

    async deleteTVA (req, res) {
        const TVAId = parseInt(req.params.TVAId);
        const TVAToDelete = await TVAQuery.getTVAById(TVAId);
        await TVAQuery.destroyTVA(TVAToDelete);
        res.redirect('/dashboard/admin/TVA');
    }
};

module.exports = TVAController;