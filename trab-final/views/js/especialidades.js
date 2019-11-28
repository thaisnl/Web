const serverURL = 'http://localhost:3333';

$(document).ready(() => {
    const urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams.get('especialidade'));
    $.ajax({
        type: "GET",
        url: serverURL + '/api/especialidades?especialidade=' + urlParams.get('especialidade'),
        contentType: 'application/json',
        xhrFields: {
            withCredentials: true
        },
        dataType: 'json',
        success: function(msg) {
            preencherComMedicos(msg);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            if(errorThrown == 'Unauthorized'){
                window.location.replace('login.html');
            }
        }
    })
})

let preencherComMedicos = (msg) => {
    $("#root").html('');
    for(let i = 0; i< msg.medicos.length; i++){
        let div = '<div class="row">'+
            '<div class="col-sm-8 containerMedico">'+
                '<h1> Sobre o médico </h1>' +
                '<p>' + msg.medicos[i].nome + '</p>' +
                '<p>'+ msg.medicos[i].descricao +'</p>' +
                '<button class="btn btn-dark" id="'+ msg.medicos[i].crm + '">Escolher</button>' +
            '</div>'
        +'</div>';
        $("#root").append(div);
    }

    for(let i = 0; i<msg.medicos.length; i++){
        document.getElementById(msg.medicos[i].crm).onclick = () => {return adicionarClickBotao(msg.medicos[i].crm)};
    }
}

let adicionarClickBotao = (crm) => {
    window.location.href = 'inserir-data.html?crm=' + crm;
}