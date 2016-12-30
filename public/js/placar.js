

$("#botao-sync").click(sincronizaPlacar); // Atrela evento de click ao botão sync

function inserePlacar() {
    var corpoTabela = $(".placar").find("tbody");
    var usuario = $("#usuarios").val();
    var numPalavras = $("#contador-palavras").text();

    var linha = novaLinha(usuario, numPalavras);

    linha.find(".botao-remover").click(removeLinha);
    linha.find(".botao-remover").css("cursor","pointer");
    corpoTabela.append(linha);

    $(".placar").slideDown(500);

    scrollPlacar();
}

function novaLinha(usuario, palavras) {
    var linha = $("<tr>");
    var colunaUsuario = $("<td>").text(usuario);
    var colunaPalavras = $("<td>").text(palavras);
    var colunaRemover = $("<td>");

    var link = $("<a>").addClass("botao-remover");
    var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");

    link.append(icone);

    colunaRemover.append(link);

    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);

    return linha;
}

function removeLinha() {

    var linha = $(this).parent().parent();
    linha.fadeOut(1000);
    setTimeout(function(){
	     linha.remove();
    },1000);
}


$("#botao-placar").click(mostraPlacar);

function mostraPlacar(){
   $(".placar").stop().slideToggle(600);
}


function scrollPlacar(){
   var posicaoPlacar = $(".placar").offset().top;

   $("html").animate(
     {
	      scrollTop: posicaoPlacar + 200 + "px"
     }, 1000);
}

function sincronizaPlacar(){
  var placar = [];
  var linhas = $("tbody>tr");

  linhas.each(function(){
    var usuario = $(this).find("td:nth-child(1)").text();
    var palavras = $(this).find("td:nth-child(2)").text();

    var score = {
      usuario: usuario,
      pontos: palavras
    };

    placar.push(score); //guardando o score no array
  });

  var dados = {
    placar: placar
  };

  $.post("http://localhost:3000/placar", dados , function() {
      console.log("Placar sincronizado com sucesso");
      $(".tooltip").tooltipster("open");
    }).fail(function(){
      $(".tooltip").tooltipster("open").tooltipster("content", "Falha ao sincronizar");
    }).always(function(){
      setTimeout(function() {
      $(".tooltip").tooltipster("close");
    }, 1200);
  });
}

function atualizaPlacar(){
  $.get("http://localhost:3000/placar",function(data){
    $(data).each(function(){
      var linha = novaLinha(this.usuario,this.pontos);
      linha.find(".botao-remover").click(removeLinha);
      linha.find(".botao-remover").css("cursor","pointer");

      $("tbody").append(linha);
    });
  });
}
