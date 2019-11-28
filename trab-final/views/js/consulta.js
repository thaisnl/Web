const serverURL = 'http://localhost:3333';

$(document).ready(function(){
    const urlParams = new URLSearchParams(window.location.search);
    $.ajax({
        type: "GET",
        url: serverURL + '/api/medico?crm=' + urlParams.get('crm') + '&data=' + urlParams.get('data') + '&horario=' + urlParams.get('horario'),
        contentType: 'application/json',
        xhrFields: {
            withCredentials: true
        },
        dataType: 'json',
        success: function(msg) {
            console.log(msg);
            preencherTela(msg);
            $("#warningMessage").css('visibility', 'hidden');
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            if(errorThrown == 'Unauthorized'){
                window.location.replace('login.html');
            }
            $("#warningMessage > span").html(XMLHttpRequest.responseText);
            $("#warningMessage").css('visibility', 'visible');
        }
    })
});

let preencherTela = (msg) => {
    let urlParams = new URLSearchParams(window.location.search);
    let data = urlParams.get('data');
    let conteudo = '<div class="conteudoConsulta">' +
                        '<h1>Sua consulta será marcada para o dia ' + data.split('-')[2] + '/' + data.split('-')[1] + '/' + data.split('-')[0] + '</h1>' +
                        '<h3>Com o médico ' + msg.medico + '</h3>' +
                        '<h4>Deseja confirmar?</h4>' +
                        '<button onclick="marcarConsulta()" class="btn btn-success">Marcar</button>'
                    '</div>'

    $("#rootConsulta").append(conteudo);
};

let marcarConsulta = () => {
    const urlParams = new URLSearchParams(window.location.search);
    $.ajax({
        type: "POST",
        url: serverURL + '/api/consulta',
        contentType: 'application/json',
        xhrFields: {
            withCredentials: true
        },
        data: JSON.stringify({
            horario: urlParams.get('horario'),
            data: urlParams.get('data'),
            crm: urlParams.get('crm')
        }),
        dataType: 'json',
        success: function(msg) {
            window.location.href = 'main-paciente.html';
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            if(errorThrown == 'Unauthorized'){
                window.location.replace('login.html');
            }
            $("#warningMessage > span").html(XMLHttpRequest.responseText);
            $("#warningMessage").css('visibility', 'visible');
        }
    })
};