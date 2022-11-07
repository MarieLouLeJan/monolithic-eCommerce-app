// import express from 'express';
// import router from './routers/index.js';

// const session = require('express-session');
// const app = express();

// // Body parser permettant de retrouvé les données sous forme d'objet JS dans req.body
// // express.json accepte des données entrantes sous forme de JSON ({"name"="toto", "truc"="machin"})
// app.use(express.urlencoded({ extended: true }));

// app.set('view engine', 'ejs');
// app.set('views', './views');

// app.use(express.static(path.join(__dirname, './assets')));

// app.use(
//     session({
//         saveUninitialized: true,
//         resave: true,
//         secret: process.env.SECRETSESSION,
//     })
// );

// app.use(router);

// module.exports = app;