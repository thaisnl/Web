const serverURL = 'http://localhost:3333';

$(document).ready(function(){
    var frm = $('#cadastroMedico');
    frm.submit(function (ev) {
        $.ajax({
            type: "POST",
            data: JSON.stringify({
                nome: $("#nome").val(),
                cpf: $("#cpf").val(),
                data: $("#data").val(),
                especialidade: $("#especialidade").val(),
                celular: $("#celular").val(),
                email: $("#email").val(),
                crm: $("#crm").val(),
                descricao: $("#descricao").val(),
                senha: $("#senha").val()
            }),
            xhrFields: {
                withCredentials: true
            },
            url: serverURL + '/api/medicos',
            contentType: 'application/json',
            dataType: 'json',
            success: function(msg) {
                // window.location.href = "main-medico.html";
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