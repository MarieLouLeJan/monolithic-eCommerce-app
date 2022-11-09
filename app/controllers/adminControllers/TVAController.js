import TVAQuery from '../../queries/TVAQuery.js';

export default {

    async showAllTVA (_, res){
        res.render('dashboard/admin/tva');
    },

    async addTVAAction (req, res) {
        const TVAFound = res.locals.TVA.find(tva => tva.value === req.body.value);
        if(TVAFound){
            res.render('dashboard/admin/tva', { message: 'TVA déjà existante' });
            return;
        }
        TVAQuery.createTVA(req.body);
        res.redirect('/dashboard/admin/tva');
    },

    async unactiveTVA (req, res) {
        const TVAId = parseInt(req.params.id);
        await TVAQuery.unactiveTVA(TVAId);
        res.redirect('/dashboard/admin/TVA');
    }
};