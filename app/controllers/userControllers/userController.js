import bcrypt from 'bcrypt';
import userQuery from '../../queries/userQuery.js';

export default {
    signupPage (_, res) {
        res.render('user/signup');
    },

    async signupAction (req, res) {
        const allUser = await userQuery.getAllUsers();
        const userFound = allUser.find(user => user.email === req.body.email);
        if(userFound){
            const error = "Compte déjà existant !"
            res.render('user/signup', { error });
            return;
        }
        await userQuery.createUser(req.body)
        const message = 'Vous pouvez maintenant vous connecter !';
        res.render('user/signin', { message });
    },

    loginPage (_, res) {
        res.render('user/signin');
    },

    async loginAction (req, res) {
        const user = await userQuery.getOneUserByEmail(req.body.email)
        if(!user){
            res.render('user/signin', { message: 'Utilisateur non existant' });
            return;
        }
        const result = await bcrypt.compare(req.body.password, user.password);
        if(!result){
            res.render('user/signin', { message: 'Mot de passe incorrect' });
            return;
        }
        const {password, ...newUser} = user.get({plain: true});
        req.session.user = newUser;
        console.log(newUser)
        res.redirect('/');
    },

    logout (req, res) {
        delete req.session.user;
        res.redirect('/');
    },
};