const Adress_type = require('./Adress_type');
const Adress = require('./Adress');
const Category = require('./Category');
const Order_adress_type = require('./Order_adress_type');
const Order_product = require('./Order_product');
const Order_state = require('./Order_state');
const Order = require('./Order');
const Product = require('./Product');
const Role = require('./Role');
const TVA = require('./TVA');
const User = require('./User');


// ASSOCIATIONS


/************ ONE TO MANY *************/

Role.hasMany(User, {
    foreignKey: 'role_id',
    as: 'users',
});

User.belongsTo(Role, {
    foreignKey: 'role_id',
    as: 'roles',
});


User.hasMany(Adress, {
    foreignKey: 'user_id',
    as: 'adresses',
});

Adress.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'users',
});


User.hasMany(Category, {
    foreignKey: 'created_by',
    as: 'categories'
});

Category.belongsTo(User, {
    foreignKey: 'created_by',
    as: 'users'
});

User.hasMany(TVA, {
    foreignKey: 'created_by',
    as: 'tva'
});

TVA.belongsTo(User, {
    foreignKey: 'created_by',
    as: 'users'
});


User.hasMany(Product, {
    foreignKey: 'created_by',
    as: 'products'
});

Product.belongsTo(User, {
    foreignKey: 'created_by',
    as: 'users'
});


Category.hasMany(Product, {
    foreignKey: 'category_id',
    as: 'products'
});

Product.belongsTo(Category, {
    foreignKey: 'category_id',
    as: 'categories'
});


TVA.hasMany(Product, {
    foreignKey: 'tva_id',
    as: 'products',
});

Product.belongsTo(TVA, {
    foreignKey: 'tva_id',
    as: 'tva',
});


User.hasMany(Order, {
    foreignKey: 'user_id',
    as: 'orders',
});

Order.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'users',
});


Order_state.hasMany(Order, {
    foreignKey: 'state_id',
    as: 'orders',
});

Order.belongsTo(Order_state{
    foreignKey: 'state_id',
    as: 'order_states'
})


/************ MANY TO MANY *************/


Product.belongsToMany(Order, {
    as: 'orders',
    // la table de liaison
    through: Order_product,
    foreignKey: 'product_id',
    otherKey: 'order_id'
});
  

Order.belongsToMany(Product, {
    as: 'products',
    through: Order_product,
    foreignKey: 'order_id',
    otherKey: 'product_id'
});



Order.belongsToMany(Adress, {
    as: 'adresses',
    through: Order_adress_type,
    foreignKey: 'order_id',
    otherKey: 'adress_id'
});

Order.belongsToMany(Adress_type, {
    as: 'adress_types',
    through: Order_adress_type,
    foreignKey: 'order_id',
    otherKey: 'type_id'
});
  
Adress.belongsToMany(Order, {
    as: 'orders',
    through: Order_adress_type,
    foreignKey: 'adress_id',
    otherKey: 'order_id'
});

Adress.belongsToMany(Adress_type, {
    as: 'adress_types',
    through: Order_adress_type,
    foreignKey: 'adress_id',
    otherKey: 'type_id'
});

Adress_type.belongsToMany(Order, {
    as: 'orders',
    through: Order_adress_type,
    foreignKey: 'type_id',
    otherKey: 'order_id'
});

Adress_type.belongsToMany(Adress, {
    as: 'adresses',
    through: Order_adress_type,
    foreignKey: 'type_id',
    otherKey: 'adress_id'
});


module.exports = { Adress_type, Adress, Category, Order_adress_type, Order_product, Order_state, Order, Product, Role, TVA, User };
