// Botão Mostrar (Tabela com todos os dados) - Invoca a função buscaCadastro
document.getElementById('mostrar').addEventListener("click", function(){
    buscaCadastro(0);
});

// Botão Nome (Tabela com os dados do Nome selecionado) - Invoca a função buscaCadastro
document.getElementById('btnNome').addEventListener("click", function(){
    buscaCadastro(1);
});

// Botão Idade (Tabela com os dados da Idade selecionada) - Invoca a função buscaCadastro
document.getElementById('btnClan').addEventListener("click", function(){
    buscaCadastro(2);
});

// Função buscaCadastro - Faz uma requisição/resposta via AJAX
function buscaCadastro(valor){

    if(valor===0){
       var url = '/select';
    }

    if(valor===1){
       var consultaNome = prompt('Informe um Nome: ');
            if(consultaNome!==null){
                var url = '/select/nome/' + consultaNome;
            }
    }

    if(valor===2){
       var consultaClan = prompt('Informe um Clã: ');
            if(consultaClan!==null){
                var url = '/select/clan/' + consultaClan;
            }
    }

    // AJAX - Início
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function() {

    if (xhr.readyState == 4 && xhr.status == 200) {

        // Recebe os dados do BD como JSON (xhr.responseText) e converte para Objeto
        var obj = JSON.parse(xhr.responseText);

        var tabela = '';

        // Constroi a tabela
        tabela += "<table>" + 
        "<tr><td>Update</td><td>Delete</td><td>Nome</td><td>Família</td><td>Clã</td><td>Escola</td><td>XP</td></tr>";
        for(x=0; x < obj.length; x++ ){
            tabela += "<tr><td><a onclick='update(" + obj[x].id + ")' href='#'>Update</a></td><td><a onclick='confirmaDelete(" + obj[x].id + ")' href='#'>Delete</a></td><td>" + obj[x].nome + "</td><td>" + obj[x].familia +
            "</td><td>" + obj[x].clan + "</td><td>" + obj[x].escola + "</td><td>" + obj[x].xp + "</td></tr>";
        }

        tabela += "</table>"

        // Tabela na DIV resultado
        document.getElementById('resultado').innerHTML = tabela;
    }
}
    xhr.send(); // AJAX - Fim

}

// Função de requisição para Rota update
function update(x){
    var novoNome = prompt("Digite o nome: ");
    var novaFamilia = prompt("Digite a família: ");
    var novoClan = prompt("Digite a clan: ");
    var novaEscola = prompt("Digite a escola: ");
    var novoXP = prompt("Digite o xp: ");

    if(novoNome!==null && novaFamilia!==null && novoClan!==null && novaEscola!==null && novoXP!==null){
      window.location.href = '/update/' + novoNome + '/' + novaFamilia + '/' + novoClan + '/' + novaEscola + '/' + novoXP + '/' + x;
    }
    
}

// Função de requisição para Rota delete
function confirmaDelete(x){
    if(confirm("Quer apagar este dado?")){
        window.location.href = '/delete/' + x;
    }
}