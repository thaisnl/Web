const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

mongoose.connect('mongodb://localhost:27017',{ useNewUrlParser: true });

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3000, () => {
    console.log('O servidor está rodando.');
});