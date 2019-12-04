const mongoose = require('mongoose');

const AlunoSchema = new mongoose.Schema({
    matricula: {
        type: String,
        required: true
    },
    nome: {
        type: String,
        required: true
    },
    data: {
        type: Date,
        required: true
    },
    ddd: {
        type: String,
        required: true
    },
    operadora: {
        type: String,
        required: true
    },
    curso: {
        type: String,
        required: true
    },
    campus: {
        type: String
    }
})

module.exports = mongoose.model('Aluno', AlunoSchema);