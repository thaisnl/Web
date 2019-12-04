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
                console.log('entrou no success');
                $("#successMessage > span").html("Um email de verificação foi enviado para seu e-mail");
                $("#successMessage").css('visibility', 'visible');
                $("#warningMessage").css('visibility', 'hidden');
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                console.log('entrou  no error');
                console.log(XMLHttpRequest.responseText);
                $("#successMessage").css('visibility', 'hidden');
                $("#warningMessage > span").html(XMLHttpRequest.responseText);
                $("#warningMessage").css('visibility', 'visible');
            }
        })
        ev.preventDefault();
    });
});

