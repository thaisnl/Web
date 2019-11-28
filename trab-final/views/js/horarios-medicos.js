const serverURL = 'http://localhost:3333';
$(document).ready(() => {
    const urlParams = new URLSearchParams(window.location.search);
    $.ajax({
        type: "GET",
        url: serverURL + '/api/horarios-medicos?medico=' + decodeURIComponent(urlParams.get('medico')) +'&data=' + urlParams.get('data'),
        contentType: 'application/json',
        xhrFields: {
            withCredentials: true
        },
        dataType: 'json',
        success: function(msg) {
            preencherComHorarios(msg);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            if(errorThrown == 'Unauthorized'){
                window.location.replace('login.html');
            }
        }
    })
})

function milisegundosParaHoras(duration) {
    var minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
  
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
  
    return hours + ":" + minutes;
}

let getMes = (data) => {
    data = new Date(data);
    if(data.getMonth() == 0){
        return 'de Janeiro';
    }
    if(data.getMonth() == 1){
        return 'de Fevereiro';
    }
    if(data.getMonth() == 2){
        return 'de Março';
    }
    if(data.getMonth() == 3){
        return 'de Abril';
    }
    if(data.getMonth() == 4){
        return 'de Maio';
    }
    if(data.getMonth() == 5){
        return 'de Junho';
    }
    if(data.getMonth() == 6){
        return 'de Julho';
    }
    if(data.getMonth() == 7){
        return 'de Agosto';
    }
    if(data.getMonth() == 8){
        return 'de Setembro';
    }
    if(data.getMonth() == 9){
        return 'de Outubro';
    }
    if(data.getMonth() == 10){
        return 'de Novembro';
    }
    if(data.getMonth() == 11){
        return 'de Dezembro';
    }
}


let preencherComHorarios = (msg) =>{
    let sobreMedico = '<div class="row sobreMedico">'+
        '<div class="col">'+
            '<h1>Sobre o médico</h1>' +
            '<h3>'+ msg.medico +'</h3>' +
            '<p>' + msg.descricao + '</p>' +
        '</div>'+
    '</div>'

    $("#rootHorarios").append(sobreMedico);

    let horarios = msg.horarios;

    let urlParams = new URLSearchParams(window.location.search);
    let data = urlParams.get('data');

    let descricao = '<p style="color: white; font-size: 25px; margin-bottom: -20px;">' + data.split('-')[2]  + ' ' + getMes(data) + '</p>';

    $("#rootHorarios").append(descricao);

    for(let i = 0; i<horarios.length; i++){
        let horario = null;
        horario = '<span onclick=addCliqueDoBotao(' + horarios[i] + ')>' +
                    milisegundosParaHoras(horarios[i])
                '</span>';
        $("#rootHorarios").append(horario);
    }
}

let addCliqueDoBotao = function(horario) {
    const urlParams = new URLSearchParams(window.location.search);
    window.location.replace('consultas-medico.html?medico=' + urlParams.get('medico') +'&data=' + urlParams.get('data') + '&horario=' + horario);
}
