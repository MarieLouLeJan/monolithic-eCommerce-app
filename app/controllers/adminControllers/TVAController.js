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
        req.body.created_by = req.session.user.id;
        req.body.active = true;
        TVAQuery.createTVA(req.body);
        res.redirect('/dashboard/admin/tva');
    },

};