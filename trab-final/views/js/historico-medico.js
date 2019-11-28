const serverURL = 'http://localhost:3333';
let consultas = [];
let pacientes = [];

let consultasFiltered = [];
let pacientesFiltered = [];

let aux = {};

$(document).ready(function(){
    $.ajax({
        type: "GET",
        url: serverURL + '/api/consultas/medico',
        contentType: 'application/json',
        xhrFields: {
            withCredentials: true
        },
        dataType: 'json',
        success: function(msg) {
            consultas = msg.consultas;
            pacientes = msg.pacientes;
            preencherComConsultas(msg);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            if(errorThrown == 'Unauthorized'){
                window.location.replace('login.html');
            }
        }
    })

    $("#search").on('input',function(){

        consultasFiltered = [];
        pacientesFiltered = [];
    
        for(let i = 0; i<consultas.length; i++){
            if(pacientes[i].match(this.value)){
                consultasFiltered.push(consultas[i]);
                pacientesFiltered.push(pacientes[i]);
            }
        }
        if(consultasFiltered.length == 0){
            return preencherComMensagemDeErro();
        }
    
        aux = {
            consultas: consultasFiltered,
            pacientes: pacientesFiltered
        }
    
        preencherComConsultas(aux);
    })
})

let preencherComMensagemDeErro = () => {
    $("#rootHistoricoMedico").html("");
    $("#rootHistoricoMedico").append('<p style="text-align: center;">Nenhum resultado</p>');
}

let preencherComConsultas = (msg) => {
    $("#rootHistoricoMedico").html("");
    for(let i = 0; i<msg.consultas.length; i++){
        let conteudo = '<div class="consultaCard" id=' + msg.consultas[i]._id +'>'+
                            '<h2>Consulta dia ' +formatarData(msg.consultas[i]) +', ' + formatarHorario(msg.consultas[i]) + '</h2>' +
                            '<h3>Paciente: ' +  msg.pacientes[i] + '</h3>' +
                        '</div>'
        $("#rootHistoricoMedico").append(conteudo);
        $("#" + msg.consultas[i]._id).click(()=>{
            addCliqueDoBotao(msg.consultas[i]._id);
        })
    }

}

let formatarHorario = (consulta) => {
    let date = new Date(consulta.data);
    let minutos = date.getUTCMinutes();
    if(minutos < 10){
        minutos = minutos + '0';
    }
    return date.getUTCHours() + ':' + minutos;
}

let addCliqueDoBotao = (id) => {
    window.location.href = 'cadastrar-receita.html?id=' + id;
};

let formatarData = (consulta) => {
    let date = new Date(consulta.data);
    let dia = date.getDate();
    let mes = date.getMonth() + 1;
    let ano = date.getFullYear();

    return dia + '/' + mes + '/' + ano;
}
