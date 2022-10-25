const userUpdated = {
    id: 5,
    name: 'marielou',
    email: '',
    password: '$2b$10$MigsDcuMFFFaf1vwwuL5L.WhZLJ1fQ8KCHp5HibX8lI1UK7gUUL0O',
    role_id: 2,
    phone: '',
    shipping: '',
    billing: 'facturation',
    created_at: '2022-10-25',
    updated_at: '2022-10-25',
    modifPassword: 'marielou',
    confirmPassword: 'marielou',
    checkPassword: 'lilou'
}

Object.keys(userUpdated).forEach(key => !userUpdated[key] && delete userUpdated[key]);

console.log(userUpdated)

// for (const prop in req.body) {
//     if (!req.body[prop] || req.body.length === 0) {
//         delete req.body[prop]; 
//     }
// }

