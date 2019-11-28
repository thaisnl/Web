var Alunos = require('../models/alunos');
var Campi = require('../models/campi');

let getCampi = async (req, res) => {
    try{
        return res.json(await Campi.find({}));
    }catch(e){
        return res.status(500).json({erro: e.message});
    }
};

let getCampus = async (req, res) => {
    let { codigo } = req.params;
    try{
        let campus = await Campi.find({codigo});
        if(campus.length == 0){
            return res.status(404).json({erro: 'Não existe campus cadastrado com esse código no servidor'});
        }
        return res.json(campus);
    }catch(e){
        return res.status(500).json({erro: 'Erro interno no servidor'})
    }
};

let postCampus = async (req, res) => {
    let { codigo } = req.body;
    let { nome } = req.body;
    let { cursos } = req.body;
    try {
        if(!codigo){
            return res.status(400).json({erro: 'Insira um código para o campus'});
        }
        if(!nome){
            return res.status(400).json({erro: 'Insira um nome para o campus'});
        }
        if(!cursos || cursos.length == 0){
            return res.status(400).json({erro: 'O campo cursos deve ser um array com no mínimo um elemento'});
        }
        let c = await Campi.find({codigo});
        if(c.length > 0){
            return res.status(400).json({erro: 'Já existe um campus com esse código cadastrado no sistema'});
        }

        let campus = {
            codigo, 
            nome, 
            cursos
        };

        campi = new Campi(campus);
        await campi.save();
        return res.json(campus);

    }catch(e){
        return res.status(500).json({erro: e.message });
    }
};

let putCampus = async (req, res) => {
    let { codigo } = req.params;
    try {
        let campus = await Campi.find({codigo});
        if(campus.length == 0) {
            return res.status(404).json({erro: 'Não existe campus cadastrado com esse código no servidor'});
        }
        if(req.body.nome) {
            campus.nome = req.body.nome;
        }
        if(req.body.cursos) {
            if(req.body.cursos.length > 0) {
                campus.cursos = req.body.cursos;
            }
            else {
                return res.status(400).json({erro: 'O campo cursos deve ser um array com no mínimo um elemento' });
            }
        }
        campus = await Campi.findOneAndUpdate({codigo}, {$set: {nome: campus.nome, cursos: campus.cursos}}, {new: true});
        console.log(campus);
        return res.json(campus);
    } catch(e) {
        return res.status(500).json({erro: 'Erro interno no servidor'});
    }
};

let deleteCampus = async (req, res) => {
    let { codigo } = req.params;
    try {
        let campus = await Campi.findOne({codigo});
        if(!campus) {
            return res.status(404).json({erro: 'Não existe campus cadastrado com esse código no servidor'});
        }

        await Campi.findOneAndDelete({codigo});
        await Alunos.deleteMany({campus: campus.campus});

        return res.json(campus);
    }catch(e){
        return res.status(500).json({erro: e.message });
    }
};

module.exports = {
    getCampi,
    getCampus,
    postCampus,
    putCampus,
    deleteCampus,
}

