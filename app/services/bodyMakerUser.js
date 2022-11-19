import bcrypt from 'bcrypt';

export default async (req, _, next) => {    
    if(req.body.password !== req.body.passwordConfirm) {
        const error = "Les deux mots de passe ne correspondent pas"
        res.render('user/signup', { error });
        return;
    };
    req.body.password = await bcrypt.hash(req.body.password, 10);
    delete req.body.passwordConfirm;
    next();
};