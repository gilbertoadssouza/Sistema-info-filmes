// pegando os elementos html da página:
const nomeBusca = document.querySelector(".input");
const mensagemErro = document.querySelector("#mensagemErro");
const botaoBuscar  = document.querySelector("#botao_buscar");
const botaoLimpar  = document.querySelector("#botao_limpar");
const titulo = document.querySelector("#titulo");
const ano = document.querySelector("#ano");
const duracao = document.querySelector("#duracao");
const genero = document.querySelector("#genero");
const diretor = document.querySelector("#diretor");
const atores = document.querySelector("#atores");
const poster = document.querySelector(".poster");
const sinopse = document.querySelector("#sinopse");

const container = document.querySelector("#filme");
container.style.opacity = "0";

// chave da api (não precisa apagar).
const apiKey = "c4f07ff4";

// caminho imagem padrão (não precisa apagar).
const imgDefault = "./default_image.png";

async function buscaFilme(nomeBusca) {
     console.log(nomeBusca);
     const url = `http://www.omdbapi.com/?t=${nomeBusca}&apikey=${apiKey}`;

     // faz uma chamada para a url passada e retorna a resposta (assincrono) 
     const resposta = await fetch(url);

     // retorna o json da resposta
     return resposta.json();
}

// adicionando evento de click ao botao buscar
// chamar funções limparCampos e core neste evento
botaoBuscar.addEventListener("click", () => {
     limparCampos(false);
     core();
});

botaoLimpar.addEventListener("click", () => {
     limparCampos(true); 
});

async function core(){
     try{ 
          //chamando a função buscarFilme (assincrono); 
          const filme = await buscaFilme(nomeBusca.value);

          //Valida os dados do filme
          validaDados(filme);

          //define os valores do filme
          defineValores(filme);

          // limpa a mensagem de erro
          mensagemErro.textContent = "";
          
          container.style.opacity = "1";
     }catch(erro){
          console.log(erro);
          mensagemErro.textContent = `${erro}`;
     }   
}

function defineValores(filme){
     // definindo os campos com informações do filme
     titulo.textContent = filme.Title;
     sinopse.textContent = `Sinopse: ${filme.Plot}`;
     ano.textContent = `Ano: ${filme.Year}`;
     duracao.textContent = `Duração: ${filme.Runtime}`;
     genero.textContent = `Genero: ${filme.Genre}`;
     atores.textContent = `Atores: ${filme.Actors}`;
     diretor.textContent = `Diretor: ${filme.Director}`;

     // definindo o caminho da imagem com a url do poster do filme
     poster.setAttribute("src", filme.Poster);
}

function limparCampos(limpaInput){
     if(limpaInput)
          nomeBusca.value = "";

     titulo.textContent = "";
     sinopse.textContent = "";
     ano.textContent = "";
     duracao.textContent = "";
     genero.textContent = "";
     atores.textContent = "";
     diretor.textContent = "";
     mensagemErro.textContent = "";
     
     // definindo o caminho da imagem com a imagem padrão
     poster.setAttribute("src", imgDefault);

     container.style.opacity = "0";
}

function validaDados(filme){
     // se o plot ou o year forem undefined ou o actors for "N/A", 
     // lançar uma exceção do tipo Error com a mensagem "Filme não encontrado";
     if(filme.Plot === undefined || filme.Year === undefined || filme.Actors === "N/A"){
         throw new Error("filme não encontrado");
     }
}