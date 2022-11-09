import roleQuery from '../../queries/roleQuery.js';
import userQuery from '../../queries/userQuery.js';

export default {

    async showAllUsers (_, res) {
        const adminRole = await roleQuery.getRoleByRoleName('admin');
        const userRole = await roleQuery.getRoleByRoleName('user')
        res.render('dashboard/admin/users/allUsers', { adminRole, userRole })
    },

    createAdminPage (_, res) {
        res.render('dashboard/admin/users/createAdmin')
    },

    async createAdminAction (req, res) {
        const allUser = await userQuery.getAllUsers()
        const userFound = allUser.find(user => user.email === req.body.email)
        if(userFound){
            res.render('dashboard/admin/users/createAdmin', { error: 'Compte déjà existant !' });
            return;
        }
        if(req.body.password !== req.body.passwordConfirm) {
            res.render('dashboard/admin/users/createAdmin', { error: 'Les deux mots de passe ne correspondent pas' });
            return;
        };
        req.body.password = await bcrypt.hash(req.body.password, 10);
        req.body.role_id = 2;
        await userQuery.createUser(req.body)
        res.redirect('dashboard/admin/users');
    }
}
