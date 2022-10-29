const User = require('./User');
const Category = require('./Category');
const Product = require('./Product');
const Role = require('./Role');
const Order = require('./Order');
const TVA = require('./TVA');
const Order_has_product = require('./Order_has_product')

Role.hasMany(User, {
    foreignKey: 'role_id',
    as: 'users',
});

User.belongsTo(Role, {
    foreignKey: 'role_id',
    as: 'role',
});

Category.hasMany(Product, {
    foreignKey: 'category_id',
    as: 'products'
});

Product.belongsTo(Category, {
    foreignKey: 'category_id',
    as: 'categories'
});

User.hasMany(Category, {
    foreignKey: 'created_by',
    as: 'category'
});

Category.belongsTo(User, {
    foreignKey: 'created_by',
    as: 'user'
});

User.hasMany(Product, {
    foreignKey: 'created_by',
    as: 'product'
});

Product.belongsTo(User, {
    foreignKey: 'created_by',
    as: 'user'
});

User.hasMany(Order, {
    foreignKey: 'user_id',
    as: 'orders',
});

Order.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'users',
});

TVA.hasMany(Product, {
    foreignKey: 'tva_id',
    as: 'products',
});

Product.belongsTo(TVA, {
    foreignKey: 'tva_id',
    as: 'tva',
});

Product.belongsToMany(Order, {
    as: 'orders',
    // la table de liaison
    through: Order_has_product,
    foreignKey: 'product_id',
    otherKey: 'order_id'

  });
  
  // un tag peur avoir plusieurs cartes
Order.belongsToMany(Product, {
    as: 'products',
    through: Order_has_product,
    foreignKey: 'order_id',
    otherKey: 'product_id'

});

module.exports = { User, Category, Product, Role, Order, TVA };
