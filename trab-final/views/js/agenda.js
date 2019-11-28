const serverURL = 'http://localhost:3333';

$(document).ready(function(){
    var frm = $('#agendaMedico');
    frm.submit(function (ev) {
        $.ajax({
            type: "PUT",
            data: JSON.stringify({
                comecoturno1: $("#comeco_turno1").val(),
                fimturno1: $("#fim_turno1").val(),
                comecoturno2: $("#comeco_turno2").val(),
                fimturno2: $("#fim_turno2").val()
            }),
            xhrFields: {
                withCredentials: true
            },
            url: serverURL + '/api/medicos/agenda',
            contentType: 'application/json',
            dataType: 'json',
            success: function(msg) {
                window.location.replace("main-medico.html");
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