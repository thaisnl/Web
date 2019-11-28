const mongoose = require('mongoose');

const ConsultaSchema = new mongoose.Schema({
    medico: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Medico',
        required: true
    },
    data: {
        type: Date,
        required: true
    },
    paciente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Paciente',
        required: true
    },
    diagnostico: {
        type: String
    },
    receita: {
        type: String
    }
})

module.exports = mongoose.model('Consulta', ConsultaSchema);