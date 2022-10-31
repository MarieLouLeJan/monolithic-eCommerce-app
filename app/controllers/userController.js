const bcrypt = require('bcrypt');
const usersQuery = require("../queries/usersQuery");

const userController = {
    signupPage (_, res) {
        res.render('user/signup');
    },

    async signupAction (req, res) {
        const allUser = await usersQuery.getAllUsers();
        const userFound = allUser.find(user => user.email === req.body.email);
        if(userFound){
            const error = "Compte déjà existant !"
            res.render('user/signup', { error });
            return;
        }
        if(req.body.password !== req.body.passwordConfirm) {
            const error = "Les deux mots de passe ne correspondent pas"
            res.render('user/signup', { error });
            return;
        };
        req.body.password = await bcrypt.hash(req.body.password, 10);
        req.body.role_id = 1;
        await usersQuery.createUser(req.body)
        const message = 'Vous pouvez maintenant vous connecter !';
        res.render('user/signin', { message });
    },

    loginPage (_, res) {
        res.render('user/signin');
    },

    async loginAction (req, res) {
        const user = await usersQuery.getOneUserByEmail(body)
        if(!user){
            const message = "Utilisateur non existant";
            res.render('user/signin', { message });
            return;
        }
        const result = await bcrypt.compare(req.body.password, user.password);
        if(!result){
            const message = "Mot de passe incorrect";
            res.render('user/signin', { message });
            return;
        }
        const {password, ...newUser} = user.get({plain: true});
        req.session.user = newUser;
        res.redirect('/');
    },

    logout (req, res) {
        delete req.session.user;
        res.redirect('/');
    },
};

module.exports = userController;