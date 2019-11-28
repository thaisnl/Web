const Medico = require('../models/Medico');
const { validate } = require('gerador-validador-cpf');
const emailValidator = require('email-validator');

const postMedico = async (req, res) => {
    let { nome } = req.body;
    let { cpf } = req.body;
    let { data } = req.body;
    let { especialidade } = req.body;
    let { celular } = req.body;
    let { email } = req.body; 
    let { crm } = req.body;
    let { descricao } = req.body;
    let { senha } = req.body;

    try{

        let m = await Medico.findOne({email: email});
        let m2 = await Medico.findOne({cpf: cpf});
        let m3 = await Medico.findOne({crm: crm});

        if(m || m2 || m3){
            return res.status(409).send("Médico já está cadastrado no sistema");
        }

        if(!validate(cpf)){
            return res.status(400).send("Insira um cpf válido");
        }

        if(!emailValidator.validate(email)){
            return res.status(400).send("Insira um email válido");
        }

        let medico = new Medico({
            nome,
            cpf,
            data,
            especialidade,
            celular,
            email,
            crm,
            descricao,
            senha
        })

        await medico.save();
    }catch(e){
        return res.status(500).send(e.message);
    }


}

const getEspecialidades = async (req, res) => {
    try{
        if(req.query['especialidade']){
            let medicos = await Medico.find({especialidade: req.query.especialidade});
            return res.json({medicos});
        }
        const especialidades = await Medico.distinct("especialidade");
        return res.json({especialidades});
    }catch(e){
        return res.status(500).send("Erro interno no servidor");
    }
}

const getMedicos = async (req, res) => {
    try{
        const medicos = await Medico.find({});
        return res.json({medicos});
    }catch(e){
        return res.status(500).send("Erro interno no servidor");
    }
}

const loginMedico = async (req, res) => {
    try{
        let medico = await Medico.findOne({email:req.body.email});
        if(!medico){
            return res.status(404).send("Email inválido");
        }
        else if(medico.senha != req.body.senha){
            return res.status(400).send("Senha inválida");
        }
        req.session.email_medico = medico.email;
        console.log(req.session.email_medico);
        req.session.email_paciente = null;
        return res.json({medico});
    }catch(e){
        res.status(500).send("Erro interno no servidor");
    }
}

const agendaMedico = async (req, res) => {
    let { comecoturno1 } = req.body;
    let { fimturno1 } = req.body;
    let { comecoturno2 } = req.body;
    let { fimturno2 } = req.body;

    if(!comecoturno1.match(/[0-9]{2}:[0-9]{2}/) ||
        !fimturno1.match(/[0-9]{2}:[0-9]{2}/) ||
        !comecoturno2.match(/[0-9]{2}:[0-9]{2}/) ||
        !fimturno2.match(/[0-9]{2}:[0-9]{2}/)){
            return res.status(400).send("Formato inválido");
        }

    let time_comecoturno1 = comecoturno1.split(":");
    let time_fimturno1 = fimturno1.split(":");
    let time_comecoturno2 = comecoturno2.split(":");
    let time_fimturno2 = fimturno2.split(":");
    
    let m = await Medico.findOneAndUpdate({email: req.session.email_medico}, {$set: 
                                                            {comecoturno1: new Date().setUTCHours(time_comecoturno1[0], time_comecoturno1[1], '00'),
                                                            fimturno1: new Date().setUTCHours(time_fimturno1[0], time_fimturno1[1], '00'),
                                                            comecoturno2: new Date().setUTCHours(time_comecoturno2[0], time_comecoturno2[1], '00'),
                                                            fimturno2: new Date().setUTCHours(time_fimturno2[0], time_fimturno2[1], '00')}}, {new: true});
    
    return res.json({medico: m});
};

let getMedico = async(req, res) => {
    let medico = await Medico.findOne({crm: req.query['crm']});
    
    return res.json({medico: medico.nome});
};

module.exports = {
    postMedico,
    getEspecialidades,
    getMedicos,
    agendaMedico,
    loginMedico,
    getMedico
}