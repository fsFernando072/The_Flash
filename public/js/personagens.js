function exibirPersonagem() {
    let equipe = document.querySelector('#equipe .cards');
    let viloes = document.querySelector('#viloes .cards');

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
                            let icone = '<img src="../img/icones/estrelaImg.png" class="estrela-vazia" alt="Icone de estrela vazia">'

                            if (resposta[i].id == sessionStorage.FK_FAVORITO) {
                                icone = '<img src="../img/icones/estrelaPreenchidaImg.png" alt="Icone de estrela preenchida">';
                            }

                            if (resposta[i].categoria == 'Equipe') {
                                temEquipe = true;
                                fraseEquipe += `<article class="card">
                                    <img src="../img/${resposta[i].caminhoImagem}" alt="Imagem do personagem ${resposta[i].nome}">
                                    <h2> ${resposta[i].nome} </h2>
                                    <p> ${resposta[i].descricao} </p>
                                    <section class="btn-favorito personagem-padrao" onclick="favoritar(${resposta[i].id}, ${i}, 'padrao')">
                                        ${icone}
                                    </section>
                                </article>`;
                            } else {
                                temVilao = true;
                                fraseVilao += `<article class="card">
                                    <img src="../img/${resposta[i].caminhoImagem}" alt="Imagem do personagem ${resposta[i].nome}">
                                    <h2> ${resposta[i].nome} </h2>
                                    <p> ${resposta[i].descricao} </p>
                                    <section class="btn-favorito personagem-padrao" onclick="favoritar(${resposta[i].id}, ${i}, 'padrao')">
                                        ${icone}
                                    </section>
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

function buscarFavorito() {
    let id = sessionStorage.FK_FAVORITO;
    let favorito = document.querySelector('#favorito .cards');

    fetch(`/personagens/buscarFavorito/${id}`)
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {
                if (resposta.statusText == 'No Content') {
                    favorito.innerHTML = '<p> Você não possui nenhum personagem favorito. </p>';
                } else {
                    resposta.json().then(function (resposta) {
                        let icone = '<img src="../img/icones/estrelaPreenchidaImg.png" alt="Icone de estrela preenchida">';

                        favorito.innerHTML = `<article class="card">
                                    <img src="../img/${resposta[0].caminhoImagem}" alt="Imagem do personagem ${resposta[0].nome}">
                                    <h2> ${resposta[0].nome} </h2>
                                    <p> ${resposta[0].descricao} </p>
                                    <section class="btn-favorito personagem-favorito" onclick="favoritar(${resposta[0].id}, 0, 'favorito')">
                                        ${icone}
                                    </section>
                                </article>`;
                    });
                }
            } else {
                throw "Houve um erro ao tentar realizar o cadastro!";
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}

function favoritar(idPersonagem, indice, tipo) {
    let idUsuario = sessionStorage.ID_USUARIO;
    let favorito = document.querySelector('#favorito .cards');

    let imagensFavorito = document.querySelectorAll(`.personagem-${tipo} img`);

    if (imagensFavorito[indice].src.includes('icones/estrelaPreenchidaImg.png')) {
        idPersonagem = null;
    }

    fetch(`/usuarios/favoritar`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idUsuario: idUsuario,
            idPersonagem: idPersonagem
        })
    }).then(function (resposta) {

        if (resposta.ok) {
            sessionStorage.FK_FAVORITO = idPersonagem;

            if (tipo == 'favorito') {
                favorito.innerHTML = '<p> Você não possui nenhum personagem favorito. </p>';
                tipo = 'padrao';
                indice = -1;
                imagensFavorito = document.querySelectorAll(`.personagem-${tipo} img`);
            }

            for (let i = 0; i < imagensFavorito.length; i++) {
                if (imagensFavorito[i].src.includes('img/icones/estrelaImg.png') && i == indice) {
                    imagensFavorito[i].src = '../img/icones/estrelaPreenchidaImg.png';
                    imagensFavorito[i].style.filter = 'invert(0%)';
                } else if (imagensFavorito[i].src.includes('img/icones/estrelaPreenchidaImg.png')) {
                    imagensFavorito[i].src = '../img/icones/estrelaImg.png';
                    imagensFavorito[i].style.filter = 'invert(100%)';
                }
            }
        } else if (resposta.status == 404) {
            window.alert("Deu 404!");
        } else {
            throw ("Houve um erro ao tentar realizar o update! Código da resposta: " + resposta.status);
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
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
                            let icone = '<img src="../img/icones/estrelaImg.png" class="estrela-vazia" alt="Icone de estrela vazia">'

                            if (resposta[i].id == sessionStorage.FK_FAVORITO) {
                                icone = '<img src="../img/icones/estrelaPreenchidaImg.png" alt="Icone de estrela preenchida">';
                            }

                            fraseResultado += `<article class="card">
                                    <img src="../img/${resposta[i].caminhoImagem}" alt="Imagem do personagem ${resposta[i].nome}">
                                    <h2> ${resposta[i].nome} </h2>
                                    <p> ${resposta[i].descricao} </p>
                                    <section class="btn-favorito personagem-pesquisa" onclick="favoritar(${resposta[i].id}, ${i}, 'pesquisa')">
                                        ${icone}
                                    </section>
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