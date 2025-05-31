const respostaModal = document.querySelector('#respostas');

function exibirQuiz() {
    let publico = document.querySelector('#publicos .cards');
    let privado = document.querySelector('#privados .cards');
    let meusQuizzes = document.querySelector('#meus_quizzes .cards');
    let id = sessionStorage.ID_USUARIO;

    let temPublico = false;
    let temPrivado = false;
    let temMeusQuizzes = false;

    let fraseMeusQuizzes = '';
    let frasePublico = '';
    let frasePrivado = '';

    fetch("/quiz/listar")
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {
                if (resposta.statusText == 'No Content') {
                    meusQuizzes.innerHTML = '<p> Você não possui nenhum quiz. </p>';
                    privado.innerHTML = '<p> Não há nenhum quiz privado. </p>';
                    publico.innerHTML = '<p> Não há nenhum quiz público. </p>';
                } else {
                    resposta.json().then(function (resposta) {
                        console.log("Dados recebidos: ", JSON.stringify(resposta));

                        for (let i = 0; i < resposta.length; i++) {
                            quizzes[i] = resposta[i];
                            let icone = '<img src="../img/icones/semSenhaImg.png" class="tipoQuiz" alt="Icone de quizzes públicos">'

                            if (resposta[i].senhaQuiz == '') {
                                temPublico = true;
                                frasePublico += `<article class="card" onclick="fazerQuiz(${resposta[i].id})">
                                    <img src="../img/${resposta[i].imgQuiz}" alt="Imagem do quiz">
                                    <h2> ${resposta[i].titulo} </h2>
                                    <p> ${resposta[i].descricao} </p>
                                    <p class="usuario"> <img src="../img/${resposta[i].imgUsu}" alt="Imagem do Usuário" class="img-usu"> ${resposta[i].nome} </p>
                                    ${icone}
                                </article>`;
                            } else {
                                icone = '<img src="../img/icones/senhaImg.png" class="tipoQuiz" alt="Icone de quizzes privados">';
                                temPrivado = true;
                                frasePrivado += `<article class="card" onclick="fazerQuiz(${resposta[i].id})">
                                    <img src="../img/${resposta[i].imgQuiz}" alt="Imagem do quiz">
                                    <h2> ${resposta[i].titulo} </h2>
                                    <p> ${resposta[i].descricao} </p>
                                    <p class="usuario"> <img src="../img/${resposta[i].imgUsu}" alt="Imagem do Usuário" class="img-usu"> ${resposta[i].nome} </p>
                                    ${icone}
                                </article>`;
                            }

                            if (id == resposta[i].fkusuario) {
                                temMeusQuizzes = true;
                                fraseMeusQuizzes += `<article class="card" onclick="fazerQuiz(${resposta[i].id})">
                                    <img src="../img/${resposta[i].imgQuiz}" alt="Imagem do quiz">
                                    <h2> ${resposta[i].titulo} </h2>
                                    <p> ${resposta[i].descricao} </p>
                                    <p class="usuario"> <img src="../img/${resposta[i].imgUsu}" alt="Imagem do Usuário" class="img-usu"> ${resposta[i].nome} </p>
                                    ${icone}
                                    <section class="btn-excluir" onclick="excluirQuiz(${resposta[i].id}, event)">
                                        <img src="../img/icones/lixeiraImg.png" alt="Icone de lixeira">
                                    </section>
                                </article>`;
                            }
                        }

                        if (!temPublico) {
                            frasePublico = '<p> Não há nenhum quiz público. </p>';
                        }

                        if (!temPrivado) {
                            frasePrivado = '<p> Não há nenhum quiz privado. </p>';
                        }

                        if (!temMeusQuizzes) {
                            fraseMeusQuizzes = '<p> Você não possui nenhum quiz. </p>';
                        }

                        meusQuizzes.innerHTML = fraseMeusQuizzes;
                        privado.innerHTML = frasePrivado;
                        publico.innerHTML = frasePublico
                    });
                }
            } else {
                throw "Houve um erro ao tentar pegar os quizzes!";
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}

function exibir(tipo) {
    let tipoQuiz = document.querySelector(`#${tipo}`);
    let botoesTipos = document.querySelectorAll('.botoes-tipos button');

    tipoQuiz.style.display = 'block';

    let indice = 0;
    if (tipo == 'publicos') {
        privados.style.display = 'none';
        meus_quizzes.style.display = 'none';
        indice = 0;
    } else if (tipo == 'privados') {
        publicos.style.display = 'none';
        meus_quizzes.style.display = 'none';
        indice = 1;
    } else {
        privados.style.display = 'none';
        publicos.style.display = 'none';
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

function pesquisarQuiz() {
    let publico = document.querySelector('#publicos');
    let privado = document.querySelector('#privados');
    let meusQuizzes = document.querySelector('#meus_quizzes');
    let botoesTipos = document.querySelector('.botoes-tipos');

    let resultado = document.querySelector('#resultados');
    let cardResultados = resultado.querySelector('.cards');
    let pesquisa = document.querySelector('#pesquisar').value;

    publico.style.display = 'none';
    privado.style.display = 'none';
    meusQuizzes.style.display = 'none';
    botoesTipos.style.display = 'none';
    resultado.style.display = 'block';

    let fraseResultado = '';

    fetch("/quiz/pesquisar", {
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

                            if (resposta[i].senhaQuiz != '') {
                                icone = '<img src="../img/icones/senhaImg.png" class="tipoQuiz" alt="Icone de quizzes privados">';
                            }

                            fraseResultado += `<article class="card" onclick="fazerQuiz(${resposta[i].id})">
                                    <img src="../img/${resposta[i].imgQuiz}" alt="Imagem do quiz">
                                    <h2> ${resposta[i].titulo} </h2>
                                    <p> ${resposta[i].descricao} </p>
                                    <p class="usuario"> <img src="../img/${resposta[i].imgUsu}" alt="Imagem do Usuário" class="img-usu"> ${resposta[i].nome} </p>
                                    ${icone}
                                </article>`;
                        }

                        cardResultados.innerHTML = fraseResultado;
                    });
                }
            } else {
                throw "Houve um erro ao tentar pegar os quizzes!";
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}

function excluirQuiz(idQuiz, e) {
    e.stopPropagation();

    let modalExcluir = document.querySelector('#modal-excluir');
    modalExcluir.style.display = 'flex';

    let secaoExcluir = modalExcluir.querySelector('.excluir');

    var frase = `<section class="img-excluir"> 
                    <img src="../img/icones/lixeiraImg.png" alt="Icone de lixeira" class="iconesGra"> 
                </section>`;
    frase += '<h1> Você tem certeza que deseja excluir o quiz? </h1>';
    frase += `<p> Esta ação não é reversível. </p>`;
    frase += `<section class="botoes-modal-excluir">
        <button onclick="fecharExcluir()" class="botaoLink"> Cancelar </button>
        <button onclick="deletarQuiz(${idQuiz})" class="botaoLink"> Excluir </button>
    </section>`;

    secaoExcluir.innerHTML = frase;
}

function deletarQuiz(idQuiz) {
    fecharExcluir();
    carregar();

    fetch("/quiz/excluir", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            idQuiz: idQuiz
        }),
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {
                fecharCarregar();
                modal.style.display = 'flex';

                respostaModal.innerHTML = '<img src="../img/icones/certoImg.png" alt="Icone de certo" class="iconesGra">';
                respostaModal.innerHTML +=
                    "<p> Quiz deletado com sucesso! Recarregando a página... </p>";

                setTimeout(() => {
                    window.location = "quiz.html";
                }, "2000");
            } else {
                fecharCarregar();
                throw "Houve um erro ao tentar realizar a exclusão!";
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
            fecharCarregar();
        });


}

function fazerQuiz(idQuiz) {
    sessionStorage.ID_QUIZ = idQuiz;

    window.location = "responder_quiz.html";
}