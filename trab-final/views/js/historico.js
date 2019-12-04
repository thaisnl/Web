const serverURL = 'http://localhost:3333';

$(document).ready(function(){
    $.ajax({
        type: "GET",
        url: serverURL + '/api/consultas/paciente',
        contentType: 'application/json',
        xhrFields: {
            withCredentials: true
        },
        dataType: 'json',
        success: function(msg) {
            console.log(msg);
            preencherComConsultas(msg);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            if(errorThrown == 'Unauthorized'){
                window.location.replace('login.html');
            }
        }
    })
})

let preencherComConsultas = (msg) => {
    for(let i = 0; i<msg.consultas.length; i++){
        let conteudo = '<div class="consultaCard">'+
                            '<h2>Consulta dia ' +formatarData(msg.consultas[i]) + ', ' + formatarHorario(msg.consultas[i]) +'</h2>' +
                            '<h3>Médico: ' +  msg.medicos[i] + '</h3>' +
                            '<p>Diagnóstico: ' +formatarDiagnostico(msg.consultas[i]) + '</p>' +
                            '<p>Receita: ' + formatarReceita(msg.consultas[i]) + '</p>' +
                        '</div>'
        $("#rootHistorico").append(conteudo);
    }

}

let formatarReceita = (consulta) => {
    if(consulta.receita == null){
        return 'Não há receita cadastrada';
    }else{
        return consulta.receita;
    }
}

let formatarData = (consulta) => {
    console.log(consulta.data);
    let date = new Date(consulta.data);
    let dia = date.getDate();
    let mes = date.getMonth() + 1;
    let ano = date.getFullYear();

    return dia + '/' + mes + '/' + ano;
}

let formatarDiagnostico = (consulta) => {
    if(consulta.diagnostico == null){
        return "Não há diagnóstico cadastrado";
    }else{
        return consulta.diagnostico;
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
