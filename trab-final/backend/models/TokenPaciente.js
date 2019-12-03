const mongoose = require('mongoose');

const TokenPacienteSchema = new mongoose.Schema({
    _userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Paciente' },
    token: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now, expires: 43200 }
});

module.exports = mongoose.model('TokenPaciente', TokenPacienteSchema);