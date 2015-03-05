function inicial() {
  var nome = 'gerarSeleniumJumpBoy';
  document.getElementById(nome).click()
}

function utilEscreverLinks() {
 var funcoes = 
  [
   {id: 'gerarSeleniumJumpBoy', title: "Colar a ordem dos dias (um para cada linha)"},
   {id: 'gerarLine', title: "Com base em <label>=<valor> gera i:group para ser usado dentro do i:line"}
   , {id: 'gerarPcolumn', title: "Com base em <label> gera p:column para ser usado dentro do dataTable, aponta para #{bean}"}
   , {id: 'gerarPreSufixo', title: "A primeira linha contem o template para identificar o prefixo e sufixo separado por $."}
   , {id: 'gerarNomeField', title: "Para cada linha tentar gerar um field"}
  ];
 for (var i = 0; funcoes.length; i++) {
  var funcao = funcoes[i];
  document.write('<a href="#" onClick="javascript:' + funcao.id + '();" id="' + funcao.id + '" title="' + funcao.title + '">' + funcao.id + '</a> - ');
 }
}


function gerarNomeField() {
  ga('nome de usuario', 'nomeUsuario');
  ga('tipo do campo', 'tipoCampo');
  ga('tipo da armacao', 'tipoArmacao');
  ga('pronome Do camel', 'pronomeCamel');
  ga('Única', 'unica');
  ga('acentuação', 'acentuacao');
  ga('Camel', 'camel');
  ga('Set Acen ();', 'setAcen();');
  //  ga('todas DEVEM ser cAMEL', 'todasDevemSerCamel');
}

function gerarSetterPopulado() {
  // poderia adicionar a palavra set antes de fieldzar
}

function fieldzar(linha) {
  var resultado = '';
  var des = noTilde(linha);
  var palavras = des.split(" ");
  var priPalMin = palavras[0].toLowerCase();
  resultado = adicionarSomentePermitidas(priPalMin);
  for (var i = 1; i < palavras.length; i++) {
    var palavra = palavras[i];
    var camel = toCamel(palavra);
    resultado += adicionarSomentePermitidas(camel);
  }
  return resultado;
}

function toCamel(palavra) {
    var camel = palavra[0].toUpperCase();
    for (var j = 1; j < palavra.length; j++) {
      camel += palavra[j];
    }
    return camel;
 }

function adicionarSomentePermitidas(palavra) {
  var pertenceProibidas = false;
  var proibidas = ['da', 'de', 'do'];
  for (var i = 0; i < proibidas.length; i++) {
    var proibida = proibidas[i];
    if (palavra.toUpperCase() == proibida.toUpperCase()) {
      pertenceProibidas = true;
    }
  }
  if (pertenceProibidas == false) {
    return palavra
  } else {
    return '';
  }
}

function ga(ori, esp) {
  var res = fieldzar(ori);
  var ret = assert(esp, res);
  setValorResultado(ret);
}
  
function assert(esp, res) {
  var ret = '';
  if (esp != res) {
    ret += ('ERRO: ' + esp + ' != ' + res);
  }
  return ret;
}


function gerarPreSufixo() {
 var res = '';
 // a primeira linha contem o template para o prefixo e sufixo
 var template = getLinhas()[0].split('$');
 var prefixo = template[0];
 var sufixo = template[1];
 for (var i = 1; i < getLinhas().length; i++) {
  var linha = getLinhas()[i];
  res += prefixo + linha + sufixo + '\n';
 }
 setValorResultado(res);
}

function gerarPcolumn() {
  var texto = getValorTexto();
  var linhas = texto.split("\n");
  var res = '';
  for (var i = 0; i < linhas.length; i++) {
    var linha = linhas[i];
    var temp = '';
    temp += '<p:column headerText="' + linha + '" style="white-space: normal;">';
    temp += '#{itinerario.}';
    temp += '</p:column>';
    res += temp;
  }
  setValorResultado(res);
}

function gerarLine() {
  var texto = document.getElementById("texto").value;
  var linhas = texto.split("\n");
  var resultado = document.getElementById("resultado");
  resultado.value = '';
  for (var i = 0; i < linhas.length; i++) {
    var dados = linhas[i].split("=");
    var linha = dados[0];
    var valor = dados[1];
    var desacent = znoTilde(linha);
    var res = '';
    res += '<i:group label="' + linha + '" for="id' + desacent + '" styleClass="size1of5">';
    res += '<h:outputText id="id' + desacent + '" value="' + valor + '" />';
    res += '</i:group>';
	
    resultado.value += res; 
  }

}

function znoTilde(linha) {
  var resultado = '';
  var des = noTilde(linha);
  var palavras = des.split(" ");
  for (var i = 0; i < palavras.length; i++) {
    var palavra = palavras[i];
    // aqui poderia colocar somente a inicial em maiuscula
    resultado += palavra;
  }
  return resultado;
}

function retirarAcento(objResp) {
var varString = new String(objResp);
var stringAcentos = new String('/àâêôûãõáéíóúçüÀÂÊÔÛÃÕÁÉÍÓÚÇÜ');
var stringSemAcento = new String('_aaeouaoaeioucuAAEOUAOAEIOUCU');
 
var i = new Number();
var j = new Number();
var cString = new String();
var varRes = '';
 
for (i = 0; i < varString.length; i++) {
cString = varString.substring(i, i + 1);
for (j = 0; j < stringAcentos.length; j++) {
if (stringAcentos.substring(j, j + 1) == cString){
cString = stringSemAcento.substring(j, j + 1);
}
}
varRes += cString;
}
objResp = varRes;
}

function noTilde(palavra) {
var varString = palavra;
var stringAcentos = new String('àâêôûãõáéíóúçüÀÂÊÔÛÃÕÁÉÍÓÚÇÜ[]');
var stringSemAcento = new String('aaeouaoaeioucuAAEOUAOAEIOUCU');
var cString = new String();
var varRes = '';

for (i = 0; i < varString.length; i++) {
cString = varString.substring(i, i + 1);
for (j = 0; j < stringAcentos.length; j++) {
if (stringAcentos.substring(j, j + 1) == cString){
cString = stringSemAcento.substring(j, j + 1);
}
}
varRes += cString;
}
return varRes;
}

function getValorTexto() {
  var texto = document.getElementById("texto").value;
  return texto;
}

function setValorResultado(valor) {
  var resultado = document.getElementById("resultado");
  resultado.value = valor;
}

function getLinhas() {
 var linhas = getValorTexto().split("\n");
 return linhas;
}

function ajuda() {
  var vim = ':map <silent> <F5> :update<Bar>:!firefox %<CR><CR>';
  var caminho = 'util.html';
  var vimCaminho = ':map <silent> <F5> :update<Bar>:!firefox util.html<CR><CR>';
}

function gerarSeleniumJumpBoy() {
  var texto = document.getElementById("texto").value;
  var linhas = texto.split("\n");
  var resultado = document.getElementById("resultado");
  resultado.value = '';
  for (var i = 0; i < linhas.length; i++) {
    var dados = linhas[i];
    var res = ' <tr> <td>clickAndWait</td> <td>link=' + dados + '</td> <td></td> </tr>';
    res += '<tr> <td>sendKeys</td> <td>id=cboOcorrencia4</td> <td>25</td> </tr>';
    res += '<tr> <td>select</td> <td>id=CBOcboOcorrencia4</td> <td>label=25-Flexibilidade</td> </tr>';
    res += '<tr> <td>clickAndWait</td> <td>id=submit1</td> <td></td> </tr>';
    resultado.value += res; 
  }
}
