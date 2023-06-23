var lista = [];

function validarForm(){
   
    if (validaDataEvento() && validaDataNascimento() && validaNome() && validaCpf() && validaSelect()) {
        salvarRegistro();
        window.location.replace("lista.html")
    } else {
        return false
    }
}
   
    function salvarRegistro(){
   
   
    var dataevento = document.getElementById("dataevento").value;
    var evento = document.getElementById("evento").value;
    var nome = document.getElementById("nome").value;
    var cpf = document.getElementById("cpf").value;
    var datanascimento = document.getElementById("datanascimento").value;
   


    if(sessionStorage.getItem("vetor_lista")) {
        lista = JSON.parse(sessionStorage.getItem("vetor_lista"));
    }


    var participantes = {};
    participantes = {
        dataEvento: dataevento,
        Evento: evento,
        Nome: nome,
        CPF: cpf,
        data_nascimento: datanascimento,
    }

    lista.push(participantes);
    sessionStorage.setItem("vetor_lista", JSON.stringify(lista));

    console.log(lista);
    return true;
}





function validaNome(){
    if(nome.value.trim() === ""){
        return alert("Preencha o nome!");
    }else{
        return true
    }
}

function validaCpf(){
    if(cpf.value.trim() === ""){
        return alert ("Informe o CPF!");
    }else{
        return true
    }
}

function validaDataEvento(){
    var hoje = new Date();
    var dataEvento = document.getElementById("dataevento").value;
    var data = new Date(Date.parse(dataEvento));
    
    if (data < hoje) {
        return alert (`A data ${dataEvento} é inválida!`);
    } else {
        return true;
    }
}

function validaDataNascimento(){
    var hoje = new Date();
    var dataNascimento = new Date(document.getElementById("datanascimento").value);
    var idadeEmMilissegundos = hoje.getTime() - dataNascimento.getTime();
    var idadeEmAnos = idadeEmMilissegundos / (1000 * 60 * 60 * 24 * 365.25);


    if (idadeEmAnos < 18) {
        return alert("A pessoa é menor de idade");
      } else {
        return true;
      }

}

function validaSelect (){
    var select = document.getElementById("evento");
    if (select.options[select.selectedIndex].value == "--Selecione--"){
        return alert("Selecione um evento para prosseguir!");
    }else{
      return true;  
    }
    
}

/*function listar(){


var dados = document.getElementById("colunas");    
var tabelaRegistros = document.getElementsByTagName("tbody")[0];
var html = "";


var novaLinha = document.createElement("tr");
tabelaRegistros.appendChild(novaLinha); // inserir a tag <tr> criada
        novaLinha.innerHTML = dados.innerHTML;


for (var i = 0; i < lista.length; i++) {
  var registro = lista[i];
  html += "<tr>";
  html += "<td>" + registro.nome + "</td>";
  html += "<td>" + registro.cpf + "</td>";
  html += "<td>" + new Date(registro.dataNascimento).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  }) + "</td>";
  html += "<td>" + new Date(registro.dataEvento).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  }) + "</td>";
  html += "<td>" + registro.nomeEvento + "</td>";
  html += "</tr>";
}
}*/

function listar(){
    var dados = document.getElementById("colunas");
    var registros = document.getElementsByTagName("tbody")[0];
   
    var lista = JSON.parse(sessionStorage.getItem("vetor_lista"));
    for (var i = 0; i < lista.length; i++) {


        var novaLinha = document.createElement("tr");
        registros.appendChild(novaLinha);


        novaLinha.innerHTML = dados.innerHTML;
       
        for (var indice in novaLinha.childNodes) {


            var celula = novaLinha.childNodes[indice];
            if (celula.nodeName == "TD") {
                switch(celula.dataset.column) {


                    case "Data do Evento":
                        celula.innerHTML = new Date(lista[i]["dataEvento"]).toLocaleDateString("pt-BR",{timeZone: 'UTC'});
                        break;
                    case "Evento":
                        celula.innerHTML = lista[i]["Evento"];
                        break;
                    case "Nome":
                        celula.innerHTML = lista[i]["Nome"];
                        break;
                    case "CPF":
                        celula.innerHTML = lista[i]["CPF"];
                        break;
                    case "Data de Nascimento":
                        celula.innerHTML = new Date(lista[i]["data_nascimento"]).toLocaleDateString("pt-BR",{timeZone: 'UTC'});
                        break;   
                }
            }
        }
    }
}
