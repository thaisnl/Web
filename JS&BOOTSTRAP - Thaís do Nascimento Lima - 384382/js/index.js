// Autora: Thaís do Nascimento Lima - 384382
usuarios = [];

let ordenarTabelaUsuarios = function(){
    var tbl = document.getElementById("table-usuarios").tBodies[0];
    var store = [];
    for(var i=0, len=tbl.rows.length; i<len; i++){
        var row = tbl.rows[i];
        var sortnr = parseFloat(row.cells[0].textContent || row.cells[0].innerText);
        if(!isNaN(sortnr)) store.push([sortnr, row]);
    }

    store.sort(function(x,y){
        return x[0] - y[0];
    });

    for(var i=0, len=store.length; i<len; i++){
        tbl.appendChild(store[i][1]);
    }
    store = null;
}

let checarMatriculaUnica = function(matricula){
    for(var user of usuarios){
        if(user.matricula === matricula){
            return false;
        }
    }
    return true;
}

let mudarCurso = function () {
    var campus = document.getElementById("campus").value;
    var cursos;
    if (campus === "Porangabussu") {
        cursos = ["Medicina", "Odontologia", "Farmácia"];
    } else if(campus === 'Pici') {
        cursos = ["Computação", "Geografia", "Matemática"];
    } else if(campus === 'Benfica'){
        cursos = ["Letras", "Filosofia", "Direito"];
    }
    var str = "";
    for (var curso of cursos) {
      str += "<option>" + curso + "</option>"
    }
    document.getElementById("curso").innerHTML = str;
}

let deletaLinha = function(l) {
    var i = l.rowIndex;
    document.getElementById("table-usuarios").deleteRow(i);
}

let setarModalErro = function() {
    let enviar = document.getElementById('enviar');
    enviar.setAttribute('data-toggle', 'modal');
    enviar.setAttribute('data-target', '#modalErro');
}

let unsetarModalErro = function () {
    let enviar = document.getElementById('enviar');
    enviar.setAttribute('data-toggle', '');
    enviar.setAttribute('data-target', '');
}

let mostrarModalConfirmacaoExclusao = function(matricula, linha){
    let confirmaRemover = document.getElementById('confirma-remover');
    confirmaRemover.onclick = () => {
        //Deleta do vetor de usuários
        let index = 0;
        for(let i = 0; i<usuarios.length; i++){
            if(usuarios[i].matricula === matricula){
                index = i;
            }
        }
        usuarios.splice(index, 1);
        // Deleta linha
        deletaLinha(linha);
        // Esconde o modal
        // Professor, não achei um jeito puro JS pra esconder o modal, então usei essa linha de jQuery
        $('#modalRemover').modal('hide');
    };
}

let formatarTelefone = function() {
    let telefone = document.getElementById('telefone');
    let input = telefone.value.replace(/\D/g,'').substring(0,9); 
    let comeco = input.substring(0,4);
    let fim = '';

    if(input.length > 6){
        fim = input.substring(4,9);
        telefone.value = `${comeco}` + '-' + `${fim}`;
    }
};

let alterarDados = function(user, linha) {
    let matricula = document.getElementById('matricula');
    let nome = document.getElementById('nome');
    let telefone = document.getElementById('telefone');
    let campus = document.getElementById('campus');
    let operadora = document.getElementById('operadoras');
    let curso = document.getElementById('curso');
    let ddd = document.getElementById('ddd');
    let email = document.getElementById('email');
    let dataNascimento = document.getElementById('data');

    let index = 0;
    for(let i = 0; i<usuarios.length; i++){
        if(usuarios[i].matricula === user.matricula){
            index = i;
            break;
        }
    }

    matricula.value = user.matricula;
    matricula.readOnly = true;
    nome.value = user.nome;
    telefone.value = user.telefone;
    campus.value = user.campus;
    operadora.value = user.operadora;
    curso.value = user.curso;
    ddd.value = user.ddd;
    email.value = user.email;
    dataNascimento.value = user.dataNascimento;

    let botaoEnviar = document.getElementById('enviar');

    botaoEnviar.innerHTML = 'Alterar';

    botaoEnviar.onclick = () => {
        
        if(!document.getElementById('form-usuario').checkValidity()){
            return true;
        }

        botaoEnviar.innerHTML = 'Enviar';

        usuarios[index].nome = nome.value;
        usuarios[index].telefone = telefone.value;
        usuarios[index].campus = campus.value;
        usuarios[index].operadora = operadora.value;
        usuarios[index].curso = curso.value;
        usuarios[index].ddd = ddd.value;
        usuarios[index].email = email.value;
        usuarios[index].dataNascimento = dataNascimento.value;

        matricula.readOnly = false;

        linha.cells[1].innerHTML = nome.value;

        botaoEnviar.onclick = addTabela;

        return false;
    }

    let botaoLimpar = document.getElementById('limpar');
    botaoLimpar.onclick = () => {

        limparCampos();

        matricula.readOnly = false;

        botaoEnviar.innerHTML = 'Enviar';

        botaoEnviar.onclick = addTabela;
        
        return false;
    }
}

let addTabela = function () {
    let matricula = document.getElementById('matricula').value;
    let nome = document.getElementById('nome').value;
    let telefone = document.getElementById('telefone').value;
    let campus = document.getElementById('campus').value;
    let operadora = document.getElementById('operadoras').value;
    let curso = document.getElementById('curso').value;
    let ddd = document.getElementById('ddd').value;
    let email = document.getElementById('email').value;
    let dataNascimento = document.getElementById('data').value;

    if(!checarMatriculaUnica(matricula)){
        setarModalErro();
        return false;
    }

    unsetarModalErro();

    if(!document.getElementById('form-usuario').checkValidity()){
        return true;
    }

    let user = {
        nome,
        matricula,
        telefone,
        campus,
        operadora,
        curso,
        ddd,
        email,
        dataNascimento
    }

    let linha = criarLinha(user);
    usuarios.push(user);
    ordenarTabelaUsuarios();

    let botaoRemover = document.getElementById('remover' + user.matricula);
    botaoRemover.onclick = () => { mostrarModalConfirmacaoExclusao(user.matricula, linha); };
    linha.onclick = () => { alterarDados(user, linha); };
    
    return false;
}

let limparCampos = function(){
    document.getElementById('matricula').value = "";
    document.getElementById('nome').value = "";
    document.getElementById('data').value = "";
    document.getElementById('email').value = "";
    document.getElementById('ddd').value = "";
    document.getElementById('telefone').value = "";
}

let criarLinha = function(user) {
    let tabelaUsuarios = document.getElementById('table-usuarios');

    let linha = tabelaUsuarios.insertRow(-1);     

    let celulaMatricula = linha.insertCell(0);
    let celulaNome = linha.insertCell(1);
    let celulaBotao = linha.insertCell(2);

    celulaNome.innerHTML = user.nome;
    celulaMatricula.innerHTML = user.matricula;
    celulaBotao.innerHTML = '<button class="btn btn-danger" data-toggle="modal" data-target="#modalRemover" id="remover' + user.matricula + '">remover</button>';

    return linha;
}

let campus = document.getElementById('campus');
let enviar = document.getElementById('enviar');
let telefone = document.getElementById('telefone');

enviar.onclick = addTabela;
campus.onchange = mudarCurso;
telefone.onkeydown = formatarTelefone;