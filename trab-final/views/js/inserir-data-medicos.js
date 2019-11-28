const serverURL = 'http://localhost:3333';

$(document).ready(() => {
    const urlParams = new URLSearchParams(window.location.search);
    var frm = $('#formData');
    frm.submit(function (ev) {
        console.log('entrou no submit');
        $.ajax({
            type: "POST",
            url: serverURL + '/api/data?medico=' + decodeURIComponent(urlParams.get('medico')),
            data: JSON.stringify({
                data: $("#data-medico").val()
            }),
            contentType: 'application/json',
            xhrFields: {
                withCredentials: true
            },
            dataType: 'json',
            success: function(msg) {
                window.location.href = 'horarios-medico.html?medico=' + encodeURIComponent(urlParams.get('medico')) + '&data=' + $("#data-medico").val(); 
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                if(errorThrown == 'Unauthorized'){
                    window.location.replace('login.html');
                }
                $("#warningMessage > span").html(XMLHttpRequest.responseText);
                $("#warningMessage").css('visibility', 'visible');
            }
        })
        ev.preventDefault();
    })
})
