const serverURL = "http://localhost:3333";
let query = "";
let pagina = "";
let key = "";

$(document).ready(()=> {
    
    $('input[type=radio][name=opcao]').change(function(){
        $("#btnEnviar").prop('disabled', false)
        if(this.value == 'especialidade'){
            $.ajax({
                type: "GET",
                url: serverURL + '/api/especialidades',
                contentType: 'application/json',
                dataType: 'json',
                xhrFields: {
                    withCredentials: true
                },
                success: function(msg) {
                    console.log(msg);
                    let msg_especialidades = msg.especialidades
                    let options = "";
                    for(var i = 0 ; i< msg_especialidades.length; i++){
                        options += `<option value=${msg_especialidades[i]}>${msg_especialidades[i]}</option>`;
                        
                    }
                    console.log(options)

                    $("#select").empty().append(options);
                    $("#warningMessage").css('visibility', 'hidden');
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    if(errorThrown == 'Unauthorized'){
                        window.location.replace('login.html');
                    }
                    $("#warningMessage > span").html(XMLHttpRequest.responseText);
                    $("#warningMessage").css('visibility', 'visible');
                }
            })
            pagina = "especialidades.html";
            key = "especialidade";
        }
        else if (this.value == 'medico'){
            $.ajax({
                type: "GET",
                crossDomain: true,
                url: serverURL + '/api/medicos',
                contentType: 'application/json',
                dataType: 'json',
                xhrFields: {
                    withCredentials: true
                },
                success: function(msg) {
                    console.log(msg);
                    let msg_medicos = msg.medicos;
                    let options = "";
                    for(var i = 0 ; i< msg_medicos.length; i++){
                        options += '<option value="' + msg_medicos[i].nome + '">' + msg_medicos[i].nome +'</option>';
                        
                    }
                    console.log(options)

                    $("#select").empty().append(options);
                    $("#warningMessage").css('visibility', 'hidden');
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    $("#warningMessage > span").html(XMLHttpRequest.responseText);
                    $("#warningMessage").css('visibility', 'visible');
                }
            })
            pagina = "medicos.html";
            key="medico";
        }
    }) 

    $("#btnEnviar").click(()=>{
        query = encodeURIComponent($("#select option:selected").val());
        window.location.href = pagina + "?" + key + "=" + query;
    })
})