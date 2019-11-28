const mongoose = require('mongoose');

const CampiSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    codigo: {
        type: String,
        required: true
    },
    cursos: {
        type: Array,
        required: true
    }

})

module.exports = mongoose.model('Campi', CampiSchema);