// Arquivo javaScript responsavel pela escolha das frases

$("#botao-frase").click(fraseAleatoria); // Atrelando evento ao botão
$("#botao-frase-id").click(buscaFrase); // Atrela o evento de click ao botão


function fraseAleatoria(){
  $("#spinner").stop().toggle();
  $.get("http://localhost:3001/frases",trocaFraseAleatoria)
  .fail(function(){
    $("#erro").stop().toggle();
    setTimeout(function(){
      $("#erro").stop().toggle();
    },2000);
  }).always(function(){
    $("#spinner").stop().toggle();
  });
}


function trocaFraseAleatoria(data){
  var frase = $(".frase");
  var numeroAletorio = Math.floor(Math.random() * data.length);

  frase.text(data[numeroAletorio].texto);
  atualizaTamanhoFrase();
  atualizaTempoInicial(data[numeroAletorio].tempo);
}

function buscaFrase(){
  $("#spinner").stop().toggle(); // Stop serve para cancelar evento anterior
  var fraseId = $("#frase_id").val();
  console.log(fraseId);

  //criacao do objeto JS que guarda a id
  var dados = {id: fraseId};
  $.get("http://localhost:3001/frases",dados,trocaFrase)
  .fail(function(){
    $("#erro").stop().toggle();
    setTimeout(function(){
      $("#erro").stop().toggle();
    },2000);
  }).always(function(){
    $("#spinner").stop().toggle();
  });
}

function trocaFrase(data){
  var frase = $(".frase");

  frase.text(data.texto);
  atualizaTempoInicial(data.tempo);
  atualizaTamanhoFrase();

}
