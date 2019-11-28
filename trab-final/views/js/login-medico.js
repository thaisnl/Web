const serverURL = 'http://localhost:3333';

$(document).ready(function(){
    var frm = $('#loginMedico');
    frm.submit(function (ev) {
        $.ajax({
            type: "POST",
            data: JSON.stringify({
                email: $("#email").val(),
                senha: $("#senha").val()
            }),
            url: serverURL + '/api/medicos/login',
            xhrFields: {
                withCredentials: true
            },
            contentType: 'application/json',
            dataType: 'json',
            success: function(msg) {
                console.log('entrou aqui');
                window.location.href = 'main-medico.html';
                $("#warningMessage").css('visibility', 'hidden');
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                console.log('erro');
                $("#warningMessage > span").html(XMLHttpRequest.responseText);
                $("#warningMessage").css('visibility', 'visible');
            }
        })
        ev.preventDefault();
    });
});