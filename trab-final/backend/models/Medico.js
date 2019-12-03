const mongoose = require('mongoose');

const MedicoSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    cpf: {
        type: String,
        required: true
    },
    data: {
        type: Date,
        required: true
    },
    isVerified: { 
        type: Boolean, 
        default: false 
    },
    especialidade: {
        type: String,
        required: true
    },
    celular: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    crm: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: true
    },
    senha: {
        type:String,
        required: true,
    },
    comecoturno1: {
        type: Date
    },
    fimturno1: {
        type: Date
    },
    comecoturno2: {
        type: Date
    },
    fimturno2: {
        type: Date
    },
    hospital: {
        type: String
    }
})

module.exports = mongoose.model('Medico', MedicoSchema);