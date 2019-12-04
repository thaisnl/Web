const Paciente = require('../models/Paciente');
const { validate } = require('gerador-validador-cpf');
const emailValidator = require('email-validator');
const nodemailer = require('nodemailer');
var crypto = require('crypto');
const Token = require('../models/TokenPaciente');

let mandarEmail = async function (req,res, email,id){

    var token = new Token({ _userId:id, token: crypto.randomBytes(16).toString('hex') });

    token.save();
    

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL || 'meumedicoauthentication@gmail.com', 
            pass: process.env.PASSWORD || 'Medauth123'
        }
    });
    let mailOptions = {
        from: 'pedroln97@gmail.com', 
        to: email,
        subject: 'Token para Verificação',
        text: 'Link para verificação do email: \nhttp:\/\/' + req.headers.host + '\/api/confirmationPaciente?token=' + token.token + '.\n'

    };

    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            return log('Error occurs');
        }
        return log('Email sent!!!');
    });


}

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

        mandarEmail(req, res, paciente.email, paciente._id);

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
        else if(paciente.isVerified == false){
            return res.status(400).send("Conta não verificada");
        }
        req.session.email_paciente = paciente.email;
        req.session.email_medico = null;
        return res.json({paciente});
    }catch(e){
        res.status(500).send("Erro interno no servidor");
    }
}

const confirmationGet = function (req, res, next) {
        // Find a matching token
        Token.findOne({ token: req.query.token }, function (err, token) {
            if (!token) return res.status(400).send('Token inválido ou expirado');
    
            // If we found a token, find a matching user
        Paciente.findOne({ _id: token._userId }, function (err, paciente) {
            if (!paciente) 
                return res.status(400).send('Usuário não encontrado');
            if (paciente.isVerified) 
                return res.status(400).send('Usuário já foi autenticado!');
            
            
            // Verify and save the user
            paciente.isVerified = true;
            paciente.save(function (err) {
                if (err) { 
                    return res.status(500).send({ msg: err.message }); 
                }
                res.status(200).send("Conta autenticada! Favor logar-se.");
            });
            
        });
    });
}

module.exports ={
    postPaciente,
    loginPaciente,
    confirmationGet
}