function exibirPersonagem() {
    let equipe = document.querySelector('#equipe .cards');
    let viloes = document.querySelector('#viloes .cards');
    let id = sessionStorage.ID_USUARIO;

    let temEquipe = false;
    let temVilao = false;

    let fraseEquipe = '';
    let fraseVilao = '';

    fetch("/personagens/listar")
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {
                if (resposta.statusText == 'No Content') {
                    equipe.innerHTML = '<p> Não há nenhum personagem da equipe </p>';
                    viloes.innerHTML = '<p> Não há nenhum personagem vilão </p>';
                } else {
                    resposta.json().then(function (resposta) {
                        console.log("Dados recebidos: ", JSON.stringify(resposta));

                        for (let i = 0; i < resposta.length; i++) {
                            let icone = '<img src="../img/icones/estrelaImg.png" class="tipoQuiz" alt="Icone de estrela vazia">'
                            
                            if (resposta[i].id == sessionStorage.FK_FAVORITO) {
                                icone = '<img src="../img/icones/estrelaPreenchidaImg.png" class="tipoQuiz" style="filter: invert(0%);" alt="Icone de estrela preenchida">';
                            }

                            if (resposta[i].categoria == 'Equipe') {
                                temEquipe = true;
                                fraseEquipe += `<article class="card">
                                    <img src="../img/${resposta[i].caminhoImagem}" alt="Imagem do personagem ${resposta[i].nome}">
                                    <h2> ${resposta[i].nome} </h2>
                                    <p> ${resposta[i].descricao} </p>
                                    ${icone}
                                </article>`;
                            } else {
                                temVilao = true;
                                fraseVilao += `<article class="card">
                                    <img src="../img/${resposta[i].caminhoImagem}" alt="Imagem do personagem ${resposta[i].nome}">
                                    <h2> ${resposta[i].nome} </h2>
                                    <p> ${resposta[i].descricao} </p>
                                    ${icone}
                                </article>`;
                            }
                        }

                        if (!temEquipe) {
                            fraseEquipe = '<p> Não há nenhum personagem da equipe </p>';
                        }

                        if (!temVilao) {
                            fraseVilao = '<p> Não há nenhum personagem vilão </p>';
                        }

                        equipe.innerHTML = fraseEquipe;
                        viloes.innerHTML = fraseVilao;
                    });
                }
            } else {
                throw "Houve um erro ao tentar listar os personagens!";
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}

function exibir(tipo) {
    let tipoPersonagem = document.querySelector(`#${tipo}`);
    let botoesTipos = document.querySelectorAll('.botoes-tipos button');
    
    tipoPersonagem.style.display = 'block';

    let indice = 0;
    if (tipo == 'equipe') {
        viloes.style.display = 'none';
        favorito.style.display = 'none';
        indice = 0;
    } else if (tipo == 'viloes') {
        equipe.style.display = 'none';
        favorito.style.display = 'none';
        indice = 1;
    } else {
        equipe.style.display = 'none';
        viloes.style.display = 'none';
        indice = 2;
    }

    if (!botoesTipos[indice].classList.contains('btn-selecionado')) {
        botoesTipos[indice].classList.add('btn-selecionado');
    }

    for (let i = 0; i < botoesTipos.length; i++) {
        if (botoesTipos[i].classList.contains('btn-selecionado') && botoesTipos[i] != botoesTipos[indice]) {
            botoesTipos[i].classList.toggle('btn-selecionado');
        }
    }
 }

function pesquisarPersonagem() {
    let botoesTipos = document.querySelector('.botoes-tipos');
    let resultado = document.querySelector('#resultados');
    let cardResultados = resultado.querySelector('.cards');
    let pesquisa = document.querySelector('#pesquisar').value;

    equipe.style.display = 'none';
    viloes.style.display = 'none';
    favorito.style.display = 'none';
    botoesTipos.style.display = 'none';
    resultado.style.display = 'block';

    let fraseResultado = '';

    fetch("/personagens/pesquisar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            pesquisa: pesquisa
        })
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {
                if (resposta.statusText == 'No Content') {
                    cardResultados.innerHTML = '<p> Nenhum resultado foi encontrado! </p>';
                } else {
                    resposta.json().then(function (resposta) {
                        console.log("Dados recebidos: ", JSON.stringify(resposta));

                        for (let i = 0; i < resposta.length; i++) {
                            let icone = '<img src="../img/icones/semSenhaImg.png" class="tipoQuiz" alt="Icone de quizzes públicos">'

                            fraseResultado += `<article class="card">
                                    <img src="../img/${resposta[i].caminhoImagem}" alt="Imagem do personagem ${resposta[i].nome}">
                                    <h2> ${resposta[i].nome} </h2>
                                    <p> ${resposta[i].descricao} </p>
                                    ${icone}
                                </article>`;
                        }

                        cardResultados.innerHTML = fraseResultado;
                    });
                }
            } else {
                throw "Houve um erro ao tentar listar os personagens!";
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}