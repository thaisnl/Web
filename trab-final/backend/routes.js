const express = require('express');
const PacienteController = require('./controllers/PacienteController');
const MedicoController = require('./controllers/MedicoController');
const ConsultaController = require('./controllers/ConsultaController');

const routes = express.Router();

let logout = async (req, res) =>  {
    await req.session.destroy();
    res.send("OK");
}

var sessionCheckerMedico = (req, res, next) => {
    console.log('entrou no do medico');
    if (!req.session.email_medico) {
        return res.status(401).send("Não está autorizado");
    } else {
        next();
    }    
};

var sessionCheckerPaciente = (req, res, next) => {
    console.log('entrou no do paciente');
    if (!req.session.email_paciente) {
        return res.status(401).send("Não está autorizado");
    } else {
        next();
    }    
};

routes.post('/api/pacientes', PacienteController.postPaciente);
routes.post('/api/medicos', MedicoController.postMedico);
routes.get('/api/especialidades', sessionCheckerPaciente, MedicoController.getEspecialidades);
routes.get('/api/medicos', sessionCheckerPaciente, MedicoController.getMedicos);
routes.get('/api/medico', sessionCheckerPaciente, MedicoController.getMedico);
routes.post('/api/medicos/login', MedicoController.loginMedico);
routes.post('/api/pacientes/login', PacienteController.loginPaciente);
routes.put('/api/medicos/agenda',  sessionCheckerMedico, MedicoController.agendaMedico);
routes.post('/api/data', sessionCheckerPaciente, ConsultaController.validarData);
routes.get('/api/horarios', sessionCheckerPaciente, ConsultaController.retornarHorarios);
routes.get('/api/horarios-medicos', sessionCheckerPaciente, ConsultaController.retornarHorarios2);
routes.post('/api/consulta', sessionCheckerPaciente, ConsultaController.marcarConsulta);
routes.post('/api/consultas-medico', sessionCheckerPaciente, ConsultaController.marcarConsulta2);
routes.get('/api/consultas/paciente', sessionCheckerPaciente, ConsultaController.retornarConsultasPaciente);
routes.get('/api/consultas/medico', sessionCheckerMedico, ConsultaController.retornarConsultasMedico);
routes.put('/api/receita', sessionCheckerMedico, ConsultaController.cadastrarReceita);
routes.get('/api/logout', logout);
routes.get('/api/retornarConsulta', sessionCheckerMedico, ConsultaController.retornarDadosConsulta);
routes.get('/api/confirmationPaciente', PacienteController.confirmationGet);
routes.get('/api/confirmationMedico', MedicoController.confirmationGet);


module.exports = routes;