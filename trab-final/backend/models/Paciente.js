const mongoose = require('mongoose');

const PacienteSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    cpf: {
        type: String,
        required: true
    },
    isVerified: { 
        type: Boolean, 
        default: false 
    },
    dataNascimento: {
        type: String,
        required: true
    },
    telefone: {
        type: String
    },
    celular: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Paciente', PacienteSchema);