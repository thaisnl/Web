const express = require('express');
const CampiController = require('./controllers/CampiController');
const AlunoController = require('./controllers/AlunoController');

const routes = express.Router();

routes.get('/api/alunos', AlunoController.getAlunos);
routes.get('/api/alunos/:matricula', AlunoController.getAluno);
routes.post('/api/alunos', AlunoController.postAluno);
routes.put('/api/alunos/:matricula', AlunoController.putAluno);
routes.delete('/api/alunos/:matricula', AlunoController.deleteAluno);

routes.get('/api/campi', CampiController.getCampi);
routes.get('/api/campi/:codigo', CampiController.getCampus);
routes.post('/api/campi', CampiController.postCampus);
routes.put('/api/campi/:codigo', CampiController.putCampus);
routes.delete('/api/campi/:codigo', CampiController.deleteCampus);

module.exports = routes;
