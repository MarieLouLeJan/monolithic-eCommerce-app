const bcrypt = require('bcrypt');
const emailValidator = require('email-validator');
const { User, Role } = require('../models');
const validator = require("email-validator");


const userController = {
    signupPage (req, res) {
        res.render('user/signup');
    },

    async signupAction (req, res) {
        try {
            if(req.body.password !== req.body.passwordConfirm) {
                const error = "Les deux mots de passe ne correspondent pas"
                res.render('register', { error })
            };
            const emailOk = validator.validate(req.body.email);
            if(!emailOk){
                const error = "Email non valide"
                res.render('register', { error })
            }
            req.body.passwordConfirm = await bcrypt.hash(req.body.password, 10);
            req.body.password = await bcrypt.hash(req.body.password, 10);
            const user = await User.create({
                name: `${req.body.firstname}  ${req.body.lastname}`,
                email: req.body.email,
                role_id: 2,
                password: req.body.password
            }, {
                include: [
                    {
                       model: Role, as: "role"
                    }
                  ]            
                })
            res.render('login', {
                message: 'Vous pouvez maintenant vous connecter !',
            });
        } catch (error) {
            console.log(error);
            res.render('user/signin', { error: error.message });
        }
    },

    loginPage (req, res) {
        res.render('user/signin');
    },

    async loginAction (req, res) {
        try {
            const user = await User.findOne({
                where: {
                    email: req.body.email,
                },
                include: 'role'
            });
            if(!user){
                const message = "Utilisateur non existant";
                res.render('login', { message })
            }
            const result = await bcrypt.compare(req.body.password, user.password);
            if(!result){
                const message = "Mot de passe incorrect";
                res.render('login', { message })
            }
            const {password, ...newUser} = user.get({plain: true});
            req.session.user = newUser
            
            res.locals.user = newUser;
            res.redirect('/');
        } catch (e) {
            console.error(e.message);
            res.status(500).send('Server Error');
        }
    },

    logout (req, res) {
        delete req.session.user;
        res.redirect('/');
    },
};

module.exports = userController;
