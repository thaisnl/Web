const serverURL = 'http://localhost:3333';

$(document).ready(function(){
    const urlParams = new URLSearchParams(window.location.search);
    preencherTela(urlParams.get('medico'))
});

let preencherTela = (medico) => {
    let urlParams = new URLSearchParams(window.location.search);
    let data = urlParams.get('data');
    let conteudo = '<div class="conteudoConsulta">' +
                        '<h1>Sua consulta será marcada para o dia ' + data.split('-')[2] + '/' + data.split('-')[1] + '/' + data.split('-')[0] + '</h1>' +
                        '<h3>Com o médico ' + medico + '</h3>' +
                        '<h4>Deseja confirmar?</h4>' +
                        '<button onclick="marcarConsulta()" class="btn btn-success">Marcar</button>'
                    '</div>'

    $("#rootConsultasMedico").append(conteudo);
};

let marcarConsulta = () => {
    const urlParams = new URLSearchParams(window.location.search);
    $.ajax({
        type: "POST",
        url: serverURL + '/api/consultas-medico',
        contentType: 'application/json',
        xhrFields: {
            withCredentials: true
        },
        data: JSON.stringify({
            horario: urlParams.get('horario'),
            data: urlParams.get('data'),
            medico: urlParams.get('medico')
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