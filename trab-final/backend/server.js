const express = require('express'),
    routes = require('./routes'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    session = require('express-session');

const app = express();

mongoose.connect('mongodb://localhost:27017',{ useNewUrlParser: true });

app.use(cors({credentials: true, origin: true}));
app.use(session({cookie: {
            httpOnly: false,
            maxAge: 1000 * 60 * 30
        },secret: 'ssshhhhh',saveUninitialized: true,resave: true}));
app.use(express.json());
app.use(routes);

app.listen(3333, () => {
    console.log('Servidor está rodando.');
});