const Paciente = require('../models/Paciente');
const { validate } = require('gerador-validador-cpf');
const emailValidator = require('email-validator');

let postPaciente = async function (req, res){
    let { nome } = req.body;
    let { cpf } = req.body;
    let { data} = req.body;
    let { telefone } = req.body;
    let { celular } = req.body;
    let { email } = req.body;
    let { senha } = req.body;

    try{

        let p = await Paciente.findOne({email: email});
        let p2 = await Paciente.findOne({cpf: cpf});

        if(p || p2){
            return res.status(409).send("Paciente já está cadastrado no sistema");
        }

        if(!validate(cpf)){
            return res.status(400).send("Insira um cpf válido");
        }

        if(!emailValidator.validate(email)){
            return res.status(400).send("Insira um email válido");
        }

        let paciente = new Paciente({
            nome, 
            cpf,
            dataNascimento: data,
            telefone,
            celular,
            email,
            senha
        })

        await paciente.save();

        return res.send({paciente: paciente});
    }catch(e){
        return res.status(500).send("Erro interno no servidor");
    }
};

const loginPaciente = async (req, res) => {
    try{
        let paciente = await Paciente.findOne({email:req.body.email});
        if(!paciente){
            return res.status(404).send("Email inválido");
        }
        else if(paciente.senha != req.body.senha){
            return res.status(400).send("Senha inválida");
        }
        req.session.email_paciente = paciente.email;
        req.session.email_medico = null;
        return res.json({paciente});
    }catch(e){
        res.status(500).send("Erro interno no servidor");
    }
}

module.exports ={
    postPaciente,
    loginPaciente,
}