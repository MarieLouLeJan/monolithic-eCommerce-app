import './app/helpers/loadenv.js'
import express from 'express';
import router from './app/routers/index.js';
import path from 'path';
import expressJSDocSwagger from 'express-jsdoc-swagger';

import * as url from 'url';

const dirname = url.fileURLToPath(new URL('.', import.meta.url));

import session from 'express-session';
const app = express();

const port = process.env.PORT || 3000;

// Body parser permettant de retrouvé les données sous forme d'objet JS dans req.body
// express.json accepte des données entrantes sous forme de JSON ({"name"="toto", "truc"="machin"})
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', './app/views');

app.use(express.static(path.join(dirname, './assets')));

app.use(
    session({
        saveUninitialized: true,
        resave: true,
        secret: process.env.SECRETSESSION,
    })
);

const options = {
    info: {
        version: '1.0.0',
        title: 'eCommerce',
        description: "Application eCommerce",
    },
    baseDir: dirname,
    // Tous les fichier JS du projects
    // ** : tous les dossiers et leurs sous-dossier
    filesPattern: ['./app/routers/**/*.js', './app/services/**/*.js', './app/queries/**/*.js', './app/validations/**/*.js'],
    // // Activation de l'interface web
    // exposeSwaggerUI: true,
    // // Route qui permettra d'afficher la doc de l'interface web
    // // expressJSDocSwagger s'en servira pour implémenter la route dans Express
    // swaggerUIPath: '/docs',
    // // Activation de la doc en JSON
    // exposeApiDocs: true,
    // // Route de la doc en JSON
    // apiDocsPath: '/api/docs',
    notRequiredAsNullable: false,
};

expressJSDocSwagger(app)(options);

app.use(router);

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});
