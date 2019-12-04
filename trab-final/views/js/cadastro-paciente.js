const serverURL = 'http://localhost:3333';

$(document).ready(function(){
    var frm = $('#cadastroPaciente');
    frm.submit(function (ev) {
        $.ajax({
            type: "POST",
            data: JSON.stringify({
                nome: $("#nome").val(),
                cpf: $("#cpf").val(),
                data: $("#data").val(),
                telefone: $("#telefone").val(),
                celular: $("#celular").val(),
                email: $("#email").val(),
                senha: $("#senha").val()
            }),
            xhrFields: {
                withCredentials: true
            },
            url: serverURL + '/api/pacientes',
            contentType: 'application/json',
            dataType: 'json',
            success: function(msg) {
                // window.location.replace("main-paciente.html");
                $("#warningMessage").css('visibility', 'hidden');
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                $("#warningMessage > span").html(XMLHttpRequest.responseText);
                $("#warningMessage").css('visibility', 'visible');
            }
        })
        ev.preventDefault();
    });
});

