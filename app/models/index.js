import AdressType from './AdressType.js';
import Order_type_adress from './Order_type_adress.js';
import Adress from './Adress.js';
import Category from './Category.js';
import Order_product from './Order_product.js';
import OrderState from './OrderState.js';
import Order from './Order.js';
import Product from './Product.js';
import Role from './Role.js';
import TVA from './TVA.js';
import User from './User.js';
import Product_review from './Product_review.js';


// ASSOCIATIONS


/************ ONE TO MANY *************/

Order.hasMany(Order_type_adress, {
    foreignKey: 'order_id',
    as: 'order_type_adress'
});

Order_type_adress.belongsTo(Order, {
    foreignKey: 'order_id',
    as: 'orders'
});

Adress.hasMany(Order_type_adress, {
    foreignKey: 'adress_id',
    as: 'order_type_adress'
});

Order_type_adress.belongsTo(Adress, {
    foreignKey: 'adress_id',
    as: 'adresses'
});

AdressType.hasMany(Order_type_adress, {
    foreignKey: 'adress_type_id',
    // as: 'order_type_adress'
});

Order_type_adress.belongsTo(AdressType, {
    foreignKey: 'adress_type_id',
    // as: 'adress_types'
});




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


OrderState.hasMany(Order, {
    foreignKey: 'order_states_id',
    as: 'orders',
});

Order.belongsTo(OrderState, {
    foreignKey: 'order_states_id',
    as: 'order_states'
});

Product.hasMany(Order_product, {
    foreignKey: 'product_id',
    // as: 'order_product',
});

Order_product.belongsTo(Product, {
    foreignKey: 'product_id',
    // as: 'products'
});

Product.hasMany(Product_review, {
    foreignKey: 'product_id',
    // as: 'product_review',
});

Product_review.belongsTo(Product, {
    foreignKey: 'product_id',
    // as: 'products'
});

User.hasMany(Product_review, {
    foreignKey: 'user_id',
    // as: 'product_review',
});

Product_review.belongsTo(User, {
    foreignKey: 'user_id',
    // as: 'users'
});


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


Product.belongsToMany(User, {
    // as: 'users',
    // la table de liaison
    through: Product_review,
    foreignKey: 'product_id',
    otherKey: 'user_id'
});
  

User.belongsToMany(Product, {
    // as: 'products',
    through: Product_review,
    foreignKey: 'user_id',
    otherKey: 'product_id'
});


export { Adress, AdressType, Category, Order_product, Order_type_adress, Order, OrderState, Product, Role, TVA, User, Product_review }
