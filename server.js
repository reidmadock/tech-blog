// Importing required packages
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const path = require('path');
const routes = require('./controllers');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Import sequelize connection and the models
const sequelize = require('./config/connection');

// Setting up express app
const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({});

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: {
            path: '/',
            httpOnly: false,
            maxAge: 7200000 }, // 2 hour session 
        store: new SequelizeStore({
            db: sequelize,
          }),
    })
);

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Sets up express middleware that is for parsing request body and static files
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
// Sets up handlebars as the view engine 

// Configures express-session middleware
app.use(routes);

// Sync the database and start the server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log(`Server listening on: http://localhost:${PORT}`)
    })
});