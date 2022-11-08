import TVAQuery from '../../queries/TVAQuery.js';

export default {

    async showAllTVA (_, res){
        const TVA = await TVAQuery.getAllTVA();
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

    async unactiveTVA (req, res) {
        const TVAId = parseInt(req.params.TVAId);
        await TVAQuery.unactiveTVA(TVAId);
        res.redirect('/dashboard/admin/TVA');
    }
};