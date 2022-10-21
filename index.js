const express = require('express');
const app = express();
require('dotenv').config();
const session = require('express-session');
const path = require('path');

const adminRouter = require('./app/routers/adminRouter');
const shopRouter = require('./app/routers/shopRouter');
const userRouter = require('./app/routers/userRouter');

const errorHandlers = require('./app/middlewares/errorHandlers');
//
app.use(express.urlencoded({ extended: true }));


app.use(
    session({
        saveUninitialized: true,
        resave: true,
        secret: process.env.SECRETSESSION,
    })
);

app.set('view engine', 'ejs');
app.set('views', './app/views');

app.use(express.static(path.join(__dirname, './assets')));


app.use(adminRouter);
app.use(shopRouter);
app.use(userRouter);

app.use(errorHandlers.notFound);
app.use(errorHandlers.developmentErrors);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});
