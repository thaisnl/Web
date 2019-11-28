const Consulta = require('../models/Consulta');
const Medico = require('../models/Medico');
const Paciente = require('../models/Paciente');

const validarData = async(req,res) => {
    let { data } = req.body;
    let medicoId = req.query['crm'];
    let medicoNome = req.query['medico'];

    if(new Date(data).getTime() < new Date().getTime()){
        return res.status(400).send("Data inválida")
    }

    if(!await Medico.findOne({crm: medicoId}) && !await Medico.findOne({nome: medicoNome})){
        return res.status(400).send("Médico inválido");
    }
    return res.json({data: data});
}

const retornarHorarios = async(req, res) => {
    let crmMedico = req.query['crm'];
    let data = req.query['data'];

    let horarios = [];
    let medico = await Medico.findOne({crm: crmMedico});
    let consultasDoMedico = await Consulta.find({medico: medico._id});
    consultasDoMedico = consultasDoMedico.filter((el) => (el == el));

    if(new Date(data).getDay() == 0){
        return res.status(400).send("Não há nenhum médico disponível nesta data");
    }

    let horarioAtual = new Date(data + ' 00:00');
    let comecoTurnoMedico = medico.comecoturno1;
    horarioAtual.setHours(comecoTurnoMedico.getHours(), comecoTurnoMedico.getMinutes());

    while((horarioAtual.getHours() != medico.fimturno1.getHours()) ||
        (horarioAtual.getMinutes() != medico.fimturno1.getMinutes())){
        let contem = false;
        consultasDoMedico.forEach(function(i){
            if(i.data.getTime() == horarioAtual.getTime()){
                contem = true;
            }
        })
        if(!contem){
            horarios.push(horarioAtual.getTime())
        }
        horarioAtual.setTime(horarioAtual.getTime() + (15 * 60 * 1000));
    };

    comecoTurnoMedico = medico.comecoturno2;
    horarioAtual.setHours(comecoTurnoMedico.getHours(), comecoTurnoMedico.getMinutes());
    while((horarioAtual.getHours() != medico.fimturno2.getHours()) ||
        (horarioAtual.getMinutes() != medico.fimturno2.getMinutes())){
        let contem = false;
        consultasDoMedico.forEach(function(i){
            if(i.data.getTime() == horarioAtual.getTime()){
                contem = true;
            }
        })
        if(!contem){
            horarios.push(horarioAtual.getTime())
        }
        horarioAtual.setTime(horarioAtual.getTime() + (15 * 60 * 1000));
    }

    res.json({descricao: medico.descricao, medico: medico.nome, horarios});
}

const retornarHorarios2 = async(req, res) => {
    let nomeMedico = req.query['medico'];
    let data = req.query['data'];

    let horarios = [];
    let medico = await Medico.findOne({nome: nomeMedico});
    let consultasDoMedico = await Consulta.find({medico: medico._id});
    consultasDoMedico = consultasDoMedico.filter((el) => (el == el));

    if(new Date(data).getDay() == 0){
        return res.status(400).send("Não há nenhum médico disponível nesta data");
    }

    let horarioAtual = new Date(data + ' 00:00');
    let comecoTurnoMedico = medico.comecoturno1;
    horarioAtual.setHours(comecoTurnoMedico.getHours(), comecoTurnoMedico.getMinutes());

    while((horarioAtual.getHours() != medico.fimturno1.getHours()) ||
        (horarioAtual.getMinutes() != medico.fimturno1.getMinutes())){
        let contem = false;
        consultasDoMedico.forEach(function(i){
            if(i.data.getTime() == horarioAtual.getTime()){
                contem = true;
            }
        })
        if(!contem){
            horarios.push(horarioAtual.getTime())
        }
        horarioAtual.setTime(horarioAtual.getTime() + (15 * 60 * 1000));
    };

    comecoTurnoMedico = medico.comecoturno2;
    horarioAtual.setHours(comecoTurnoMedico.getHours(), comecoTurnoMedico.getMinutes());
    while((horarioAtual.getHours() != medico.fimturno2.getHours()) ||
        (horarioAtual.getMinutes() != medico.fimturno2.getMinutes())){
        let contem = false;
        consultasDoMedico.forEach(function(i){
            if(i.data.getTime() == horarioAtual.getTime()){
                contem = true;
            }
        })
        if(!contem){
            horarios.push(horarioAtual.getTime())
        }
        horarioAtual.setTime(horarioAtual.getTime() + (15 * 60 * 1000));
    }

    res.json({descricao: medico.descricao, medico: medico.nome, horarios});
}

let marcarConsulta = async (req, res) => {
    let { horario } = req.body;
    let { data } = req.body;
    console.log('a data sem formatação é: ' + data);
    data = new Date(data + ' 00:00');
    let date = new Date();
    date.setTime(horario);
    data.setHours(date.getHours(), date.getMinutes());
    console.log(data);
    console.log(' a data é:' + data);
    let { crm } = req.body;
    try{
        let medico = await Medico.findOne({crm});

        let consulta = await Consulta.findOne({data, medico: medico._id});

        if(consulta){
            return res.status(409).send("Horário não disponível");
        }

        let paciente = await Paciente.findOne({email: req.session.email_paciente});

        let c = new Consulta({
            medico: medico._id,
            paciente: paciente._id,
            data
        })

        await c.save();

        return res.json({consulta: c});
    }catch(e){
        return res.status(500).send('Erro interno no servidor');
    }
}

let marcarConsulta2 = async (req, res) => {
    let { horario } = req.body;
    let { data } = req.body;
    data = new Date(data + ' 00:00');
    let date = new Date();
    date.setTime(horario);
    data.setHours(date.getHours(), date.getMinutes());
    let nome = req.body.medico;
    try{
        let medico = await Medico.findOne({nome});

        let consulta = await Consulta.findOne({data, medico: medico._id});

        if(consulta){
            return res.status(409).send("Horário não disponível");
        }

        let paciente = await Paciente.findOne({email: req.session.email_paciente});

        let c = new Consulta({
            medico: medico._id,
            paciente: paciente._id,
            data
        })

        await c.save();

        return res.json({consulta: c});
    }catch(e){
        return res.status(500).send('Erro interno no servidor');
    }
}

let retornarConsultasPaciente = async(req, res) => {
    let paciente = await Paciente.findOne({email: req.session.email_paciente});
    let consultas = await Consulta.find({paciente: paciente._id}).sort({data: -1});
    let medicos = [];

    for(let i = 0; i<consultas.length; i++){
        let medico = await Medico.findOne({_id: consultas[i].medico});
        medicos.push(medico.nome);
    }

    try{
        return res.json({consultas: consultas, medicos: medicos});
    }catch(e){
        return res.status(500).send("Erro interno no servidor");
    }
}

let retornarConsultasMedico = async(req, res) => {
    let medico = await Medico.findOne({email: req.session.email_medico});
    let consultas = await Consulta.find({medico: medico._id}).sort({data: -1});
    let pacientes = [];

    for(let i = 0; i<consultas.length; i++){
        let paciente = await Paciente.findOne({_id: consultas[i].paciente});
        pacientes.push(paciente.nome);
    }

    try{
        return res.json({consultas, pacientes});
    }catch(e){
        return res.status(500).send("Erro interno no servidor");
    }
};


let cadastrarReceita = async (req, res) => {
    let idConsulta = req.query['id'];
    let { diagnostico } = req.body;
    let { receita } = req.body;

    try{
        let consulta = await Consulta.findOne({_id: idConsulta});

        if(!consulta){
            return res.status(404).send("Não há consulta com essa id");
        }

        let c = await Consulta.findOneAndUpdate({_id: idConsulta}, {$set: {diagnostico, receita}});

        return res.json({consulta: c});

    }catch(e){
        return res.status(500).send("Erro interno no servidor");
    }
};

let retornarDadosConsulta = async(req, res) => {
    let idConsulta = req.query['id'];
    try{
        let consulta = await Consulta.findOne({_id: idConsulta});
        return res.json({receita: consulta.receita, diagnostico: consulta.diagnostico});
    }catch(e){
        return res.status(500).send(e.message);
    }
}

module.exports = {
    validarData,
    retornarHorarios,
    retornarHorarios2,
    marcarConsulta,
    marcarConsulta2,
    retornarConsultasPaciente,
    retornarConsultasMedico,
    cadastrarReceita,
    retornarDadosConsulta
}