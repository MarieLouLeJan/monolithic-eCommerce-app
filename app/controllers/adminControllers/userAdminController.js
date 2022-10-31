const { User, Role, Category, Product, TVA } = require("../../models");
const rolesQuery = require("../../queries/rolesQuery");
const usersQuery = require("../../queries/usersQuery");

const userAdminController = {

    async showAllUsers (_, res) {
        const adminRole = await rolesQuery.getRoleByRoleName('admin');
        const userRole = await rolesQuery.getRoleByRoleName('user')
        console.log(adminRole, userRole)
        res.render('dashboard/admin/users/allUsers', { adminRole, userRole })
    },

    createAdminPage (_, res) {
        res.render('dashboard/admin/users/createAdmin')
    },

    async createAdminAction (req, res) {
        const allUser = await usersQuery.getAllUsers()
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
        const user = await usersQuery.createUser(req.bdoy)
        res.redirect('dashboard/admin/users');
        return;
    }

}

module.exports = userAdminController;
