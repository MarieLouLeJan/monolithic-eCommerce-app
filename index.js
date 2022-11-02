const express = require('express');
const app = import('./app/index')
require('dotenv').config();
const session = require('express-session');
const path = require('path');


app.use(
    session({
        saveUninitialized: true,
        resave: true,
        secret: process.env.SECRETSESSION,
    })
);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});
