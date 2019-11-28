const serverURL = 'http://localhost:3333';

$(document).ready(function(){

    const urlParams = new URLSearchParams(window.location.search);
    $.ajax({
        type: "GET",
        xhrFields: {
            withCredentials: true
        },
        url: serverURL + '/api/retornarConsulta?id=' + urlParams.get('id'),
        success: function(msg) {
            console.log(msg);
            $("#receita").val(msg.receita);
            $("#diagnostico").val(msg.diagnostico);
            $("#warningMessage").css('visibility', 'hidden');
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log('entrou no erro');
            if(errorThrown == 'Unauthorized'){
                window.location.replace('login.html');
            }
            $("#warningMessage > span").html(XMLHttpRequest.responseText);
            $("#warningMessage").css('visibility', 'visible');
        }
    })

    var botao = $('#cadastrarReceita');
    botao.click(function () {
        const urlParams = new URLSearchParams(window.location.search);
        $.ajax({
            type: "PUT",
            data: JSON.stringify({
                diagnostico: $("#diagnostico").val(),
                receita: $("#receita").val()
            }),
            xhrFields: {
                withCredentials: true
            },
            url: serverURL + '/api/receita?id=' +urlParams.get('id'),
            contentType: 'application/json',
            dataType: 'json',
            success: function(msg) {
                window.location.href = "main-medico.html";
                $("#warningMessage").css('visibility', 'hidden');
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                $("#warningMessage > span").html(XMLHttpRequest.responseText);
                $("#warningMessage").css('visibility', 'visible');
            }
        })
    });
});