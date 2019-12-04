var Aluno = require('../models/alunos');
var Campi = require('../models/campi');

let getAlunos = async (req, res) => {
    try{
        let aluno = await Aluno.find({});
        if(req.query.campus){
            aluno = await aluno.filter((a) => a.campus == req.query.campus);
        }
        if(req.query.dataInicial && req.query.dataFinal){
            let dataI = new Date(req.query.dataInicial);
            let dataF = new Date(req.query.dataFinal);
            aluno = await aluno.filter((a) => a.data.getTime() >= dataI.getTime() && a.data.getTime() <= dataF.getTime());
        }
        if(req.query.curso){
            aluno = await aluno.filter((a) => a.curso == req.query.curso);
        }
        return res.json(aluno);
    }catch(e){
        return res.status(500).json({erro: e.message});
    }
};

let getAluno = async (req, res) => {
    let { matricula } = req.params;

    try {
        let aluno = await Aluno.find({matricula});
        if(!aluno){
            return res.status(404).json({erro: 'Não existe aluno com essa matrícula'});
        }
        return res.json(aluno);
    } catch(e){
        return res.status(500).json({erro: 'Erro interno no servidor'});
    }
};

let postAluno = async (req,res) => {
    console.log(req.body);
    let { matricula } = req.body;
    let { campus } = req.body;
    try {
        if(!matricula){
            return res.status(400).json({erro: 'Insira uma matrícula'})
        }
        if(!campus){
            return res.status(400).json({erro: 'Insira um campus'});
        }
        if(!req.body.nome){
            return res.status(400).json({erro: 'Insira um nome'});
        }
        if(!req.body.data){
            return res.status(400).json({erro: 'Insira uma data de nascimento (mm/dd/yyyy)'});
        }
        if(!req.body.email){
            return res.status(400).json({erro: 'Insira um e-mail'});
        }
        if(!req.body.ddd){
            return res.status(400).json({erro: 'Insira um ddd'});
        }
        if(!req.body.operadora){
            return res.status(400).json({erro: 'Insira uma operadora'});
        }
        if(!req.body.telefone){
            return res.status(400).json({erro: 'Insira um telefone'});
        }
        if(!req.body.curso){
            return res.status(400).json({erro: 'Insira um curso'});
        }

        let aluno = await Aluno.find({matricula});

        if(aluno.length > 0){
            return res.status(400).json({erro: 'Já existe aluno com essa matrícula cadastrada'});
        }
        let c = await Campi.find({nome: campus});

        if(c.length > 0){
            let a = { 
                campus, 
                matricula 
            };
            let data =  new Date(req.body.data);

            a.data = data;
            a.nome = req.body.nome;
            a.ddd = req.body.ddd;
            a.operadora = req.body.operadora;
            a.telefone = req.body.telefone;
            a.curso = req.body.curso;
            
            let al = new Aluno(a);
            await al.save();

            return res.json(al);
        } else {
            return res.status(400).json({erro: 'O campus não está cadastrado no servidor'});
        }
    } catch(e){
        return res.status(500).json({erro: e.message});
    }
};

let putAluno = async (req, res) => {
    let { matricula } = req.params;
    try{
        if(!matricula){
            return res.status(400).json({erro: 'Insira uma matrícula'})
        }
        let aluno = await Aluno.find({matricula});
        if(aluno.length == 0){
            return res.status(404).json({erro: 'Não existe aluno com essa matrícula no servidor'});
        }
        if(req.body.nome){
            aluno = await Aluno.findOneAndUpdate({matricula}, {$set: {nome: req.body.nome}}, {new: true});
        }
        if(req.body.email){
            aluno = await Aluno.findOneAndUpdate({matricula}, {$set: {email: req.body.email}}, {new: true});
        }
        if(req.body.campus){
            if(Campi.find({campus: req.body.campus}).length == 0){
                return res.status(404).json({erro: 'O campus não está cadastrado no servidor'});
            }
            aluno = await Aluno.findOneAndUpdate({matricula}, {$set: {campus: req.body.campus}}, {new: true});
        }
        if(req.body.data){
            let data = new Date(req.body.data);
            aluno = await Aluno.findOneAndUpdate({matricula}, {$set: {data: req.body.data}}, {new: true});
        }
        if(req.body.telefone){
            aluno = await Aluno.findOneAndUpdate({matricula}, {$set: {telefone: req.body.telefone}}, {new: true});
        }
        if(req.body.ddd){
            aluno = await Aluno.findOneAndUpdate({matricula}, {$set: {ddd: req.body.ddd}}, {new: true});
        }
        if(req.body.curso){
            aluno = await Aluno.findOneAndUpdate({matricula}, {$set: {curso: req.body.curso}}, {new: true});
        }
        if(req.body.operadora){
            aluno = await Aluno.findOneAndUpdate({matricula}, {$set: {operadora: req.body.operadora}}, {new: true});
        }
        return res.json(aluno);
    }catch(e){
        return res.status(500).json({erro: 'Erro interno no servidor'});
    }
};

let deleteAluno = async (req, res) => {
    let { matricula } = req.params;
    try{
        let aluno = await Aluno.find({matricula: matricula});
        if(aluno.length == 0){
            return res.status(404).json({erro: 'Não existe aluno com essa matrícula no servidor'});
        }
        await Aluno.findOneAndDelete({matricula});
        return res.json(aluno);
    }catch(e){
        return res.status(500).json({erro: 'Erro interno no servidor'});
    }
};

module.exports = {
    getAlunos,
    getAluno,
    postAluno,
    putAluno,
    deleteAluno
};