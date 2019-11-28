const _serverURL = 'http://localhost:3333';

$(document).ready(function(){
    var botao = $('#logout');
    botao.click(function () {
        $.ajax({
            type: "GET",
            url: _serverURL + '/api/logout',
            xhrFields: {
                withCredentials: true
            },
            success: function(msg) {
                window.location.href = 'login.html';
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
            }
        })
    });
});