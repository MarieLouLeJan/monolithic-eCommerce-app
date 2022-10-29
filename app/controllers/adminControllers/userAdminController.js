const { User, Role, Category, Product, TVA } = require("../../models");

const userAdminController = {

    async showAllUsers (_, res) {
        const adminRole = await Role.findAll({
            where: {
                name: 'admin',
            },
            include: 'users'
        });
        const userRole = await Role.findAll({
            where: {
                name: 'user',
            },
            include: 'users'
        });
        console.log(adminRole, userRole)
        res.render('dashboard/admin/users/allUsers', { adminRole, userRole })
    },

    createAdminPage (_, res) {
        res.render('dashboard/admin/users/createAdmin')
    },

    async createAdminAction (req, res) {
        const allUser = await User.findAll({
            raw: true
        });
        const userFound = allUser.find(user => user.email === req.body.email)
        if(userFound){
            const error = "Compte déjà existant !"
            res.render('dashboard/admin/users/createAdmin', { error });
            return;
        }
        if(req.body.password !== req.body.passwordConfirm) {
            const error = "Les deux mots de passe ne correspondent pas"
            res.render('dashboard/admin/users/createAdmin', { error });
            return;
        };
        req.body.password = await bcrypt.hash(req.body.password, 10);
        req.body.role_id = 2;
        const user = await User.create(req.body)
        res.redirect('dashboard/admin/users');
        return;
    }

}

module.exports = userAdminController;
