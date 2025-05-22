const carrossel = document.querySelector('.carrossel');
const respostaModal = document.querySelector('#respostas');

let senhaQuiz = '';

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
                    meusQuizzes.innerHTML = '<p> Você não possui nenhum quiz </p>';
                    privado.innerHTML = '<p> Não há nenhum quiz privado </p>';
                    publico.innerHTML = '<p> Não há nenhum quiz público </p>';
                } else {
                    resposta.json().then(function (resposta) {
                        console.log("Dados recebidos: ", JSON.stringify(resposta));

                        for (let i = 0; i < resposta.length; i++) {
                            quizzes[i] = resposta[i];

                            if (id == resposta[i].fkusuario) {
                                temMeusQuizzes = true;
                                fraseMeusQuizzes += `<article class="card" onclick="fazerQuiz(${resposta[i].id})">
                                    <img src="../img/${resposta[i].imgQuiz}" alt="Imagem do quiz">
                                    <h2> ${resposta[i].titulo} </h2>
                                    <p> ${resposta[i].descricao} </p>
                                    <p class="usuario"> <img src="../img/${resposta[i].imgUsu}" alt="Imagem do Usuário" class="img-usu"> ${resposta[i].nome} </p>
                                </article>`;
                            } 
                            
                            if (resposta[i].senhaQuiz == '') {
                                temPublico = true;
                                frasePublico += `<article class="card" onclick="fazerQuiz(${resposta[i].id})">
                                    <img src="../img/${resposta[i].imgQuiz}" alt="Imagem do quiz">
                                    <h2> ${resposta[i].titulo} </h2>
                                    <p> ${resposta[i].descricao} </p>
                                    <p class="usuario"> <img src="../img/${resposta[i].imgUsu}" alt="Imagem do Usuário" class="img-usu"> ${resposta[i].nome} </p>
                                </article>`;
                            } else {
                                temPrivado = true;
                                frasePrivado += `<article class="card" onclick="fazerQuiz(${resposta[i].id})">
                                    <img src="../img/${resposta[i].imgQuiz}" alt="Imagem do quiz">
                                    <h2> ${resposta[i].titulo} </h2>
                                    <p> ${resposta[i].descricao} </p>
                                    <p class="usuario"> <img src="../img/${resposta[i].imgUsu}" alt="Imagem do Usuário" class="img-usu"> ${resposta[i].nome} </p>
                                </article>`;
                            }
                        }

                        if (!temPublico) {
                            frasePublico = '<p> Não há nenhum quiz público </p>';
                        }

                        if (!temPrivado) {
                            frasePrivado = '<p> Não há nenhum quiz privado </p>';
                        }

                        if (!temMeusQuizzes) {
                            fraseMeusQuizzes = '<p> Você não possui nenhum quiz </p>';
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
                            fraseResultado += `<article class="card" onclick="fazerQuiz(${resposta[i].id})">
                                    <img src="../img/${resposta[i].imgQuiz}" alt="Imagem do quiz">
                                    <h2> ${resposta[i].titulo} </h2>
                                    <p> ${resposta[i].descricao} </p>
                                    <p class="usuario"> <img src="../img/${resposta[i].imgUsu}" alt="Imagem do Usuário" class="img-usu"> ${resposta[i].nome} </p>
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

function fazerQuiz(idQuiz) {
    sessionStorage.ID_QUIZ = idQuiz;

    window.location = "responder_quiz.html";
}

function pegarQuiz() {
    let idQuiz = sessionStorage.ID_QUIZ;

    fetch(`/quiz/listarSelecionado/${idQuiz}`)
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {
                resposta.json().then(function (resposta) {
                    console.log("Dados recebidos: ", JSON.stringify(resposta));
                    exibirPerguntas(resposta);
                });
            } else {
                throw "Houve um erro ao tentar pegar os quizzes!";
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}

function exibirPerguntas(quiz) {
    let idQuiz = sessionStorage.ID_QUIZ;

    fetch(`/perguntas/listar/${idQuiz}`)
        .then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(function (resposta) {
                    let conteudo = '';

                    for (let i = 0; i < 6; i++) {
                        if (i == 0) {
                            conteudo += `<section class="addquiz">`;
                            conteudo += `<img src="../img/${quiz[0].imgQuiz}" alt="Imagem do quiz" id="foto_quiz">`;

                            conteudo += `<h1 class="titulo"> ${quiz[0].titulo} </h1>`;

                            conteudo += `<p> ${quiz[0].descricao} </p>`;

                            conteudo += `<p class="usuario"> Feito por: <img src="../img/${quiz[0].imgUsu}" alt="Imagem do Usuário" class="img-usu"> ${quiz[0].nome} </p>`;

                            if (quiz[0].senhaQuiz == '') {
                                conteudo += `<section class="botoes">`;

                                conteudo += `<button onclick="avancar(${i + 1}), subir()" class="botaoLink"> Iniciar </button>`;

                                conteudo += `</section></section>`;
                            } else {
                                senhaQuiz = quiz[0].senhaQuiz;

                                conteudo += ` <label for="senha" id="label-senha"> Senha </label>`
                                conteudo += `<input type="password" name="senha" id="senha" placeholder="Digite a senha do quiz">`;

                                conteudo += `<section class="botoes">`;

                                conteudo += `<button onclick="validarSenha(), subir()" class="botaoLink"> Iniciar </button>`;

                                conteudo += `</section></section>`;
                            }


                        } else {
                            conteudo += `<section class="responder-quiz">`;
                            conteudo += `<h1 class="titulo"> Pergunta ${i} </h1>`;

                            conteudo += `<label> ${resposta[i - 1].pergunta} </label>`;

                            conteudo += `<label for="radAltA${i}" class="alternativa responder"> <input type="radio" name="radAlt${i}" id="radAltA${i}"> ${resposta[i - 1].alternativaA} </label>`;

                            conteudo += `<label for="radAltB${i}" class="alternativa responder"> <input type="radio" name="radAlt${i}" id="radAltB${i}"> ${resposta[i - 1].alternativaB} </label>`;

                            conteudo += `<label for="radAltC${i}" class="alternativa responder"> <input type="radio" name="radAlt${i}" id="radAltC${i}"> ${resposta[i - 1].alternativaC} </label>`;

                            conteudo += `<label for="radAltD${i}" class="alternativa responder"> <input type="radio" name="radAlt${i}" id="radAltD${i}"> ${resposta[i - 1].alternativaD} </label>`;

                            conteudo += `<label for="radAltE${i}" class="alternativa responder"> <input type="radio" name="radAlt${i}" id="radAltE${i}"> ${resposta[i - 1].alternativaE} </label>`;

                            conteudo += `<section class="botoes">`;
                            conteudo += `<button onclick="voltar(${i}), subir()" class="botaoLink"> Voltar </button>`;

                            if (i < 5) {
                                conteudo += `<button onclick="validar(${i + 1}), subir()" class="botaoLink"> Avançar </button>`;
                            } else {
                                conteudo += `<button onclick="validar(${i + 1}), subir()" class="botaoLink"> Finalizar </button>`;
                            }

                            conteudo += `</section></section>`;

                            conteudo += `<section class="grafico-resposta"> <canvas id="dashboard-per${i + 1}"></canvas> </section>`;
                        }
                    }

                    carrossel.innerHTML += conteudo;
                    exibirRespostas(resposta);
                });
            } else if (resposta.status == 404) {
                window.alert("Deu 404!");
            } else {
                throw ("Houve um erro ao tentar listar as perguntas! Código da resposta: " + resposta.status);
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}

function validarSenha() {
    let senha = document.querySelector('#senha').value;

    if (senha == senhaQuiz) {
        avancar(1);
    } else {
        modal.style.display = 'flex';
        respostaModal.innerHTML = '<img src="../img/icones/erroImg.png" alt="Icone de erro" class="iconesGra">';
        respostaModal.innerHTML += '<p> <img src="../img/icones/erroImg.png" alt="Icone de erro" class="iconesPeq"> A senha está incorreta </p>';
    }
}

function exibirRespostas(perguntas) {
    console.log(perguntas)

    let idQuiz = sessionStorage.ID_QUIZ;

    let id_usuario = sessionStorage.ID_USUARIO;
    let respondeu = false;

    fetch(`/respostas/listar/${idQuiz}`)
        .then(function (resposta) {
            if (resposta.ok) {
                if (resposta.statusText != 'No Content') {
                    resposta.json().then(function (resposta) {
                        console.log(resposta);

                        let vetorQtd = [];

                        for (let i = 0; i < 5; i++) {
                            vetorQtd.push({Certas: 0, Erradas: 0});
                        }

                        for (let i = 0; i < resposta.length; i++) {
                            let numPergunta = resposta[i].fkpergunta;

                            if (resposta[i].alternativaEscolhida == perguntas[numPergunta - 1].alternativaCorreta) {
                                vetorQtd[numPergunta - 1].Certas += 1;
                            } else {
                                vetorQtd[numPergunta - 1].Erradas += 1;
                            }

                            if (resposta[i].fkusuario == id_usuario) {
                                respondeu = true;

                                let radio = document.querySelector(`#radAlt${perguntas[numPergunta - 1].alternativaCorreta}${numPergunta}`);
                                radio.parentElement.classList.add('resposta-certa');
                                radio.click();

                                let botaoFinalizar = document.querySelectorAll('.carrossel .botaoLink');
                                botaoFinalizar[botaoFinalizar.length - 1].style.display = 'none';

                                if (perguntas[numPergunta - 1].alternativaCorreta != resposta[i].alternativaEscolhida) {
                                    let radioEscolhido = document.querySelector(`#radAlt${resposta[i].alternativaEscolhida}${numPergunta}`);
                                    radioEscolhido.parentElement.classList.add('resposta-errada');
                                    radioEscolhido.click();
                                }
                            }
                        }

                        if (respondeu) {
                            let inputRadio = document.querySelectorAll('input[type="radio"]');
                            inputRadio.forEach(input => {
                                input.disabled = true;
                            });

                            for (let i = 0; i < 5; i++) {
                                plotarGrafico(vetorQtd[i], i);
                            }
                        }
                    });
                }
            } else if (resposta.status == 404) {
                window.alert("Deu 404!");
            } else {
                throw ("Houve um erro ao tentar listar as respostas! Código da resposta: " + resposta.status);
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}

function plotarGrafico(resposta, numero) {
    Chart.defaults.color = '#ffffff';
    Chart.defaults.font.size = 16;

    console.log('iniciando plotagem do gráfico...');

    let labels = ['Certas', 'Erradas'];

    let dados = {
        labels: labels,
        datasets: [{
            label: 'Alternativas',
            data: [],
            backgroundColor: [
                'rgba(11, 188, 11, 0.8)',
                'rgba(163, 5, 32, 0.8)',
            ],
            borderColor: [
                'rgb(0, 78, 0)',
                'rgb(82, 3, 16)',
            ],
            borderWidth: 4
        },
        ]
    };

    console.log(resposta)

    dados.datasets[0].data.push(resposta.Certas);
    dados.datasets[0].data.push(resposta.Erradas);

    // Criando estrutura para plotar gráfico - config
    let config = {
        type: 'pie',
        data: dados,
        options: {
            plugins: {
                title: {
                    display: true,
                    text: `Respostas`,
                    font: {
                        size: 28
                    },
                    padding: {
                        top: 16,
                        bottom: 16
                    }
                }
            }
        }
    }

    let meuGrafico = new Chart(
        document.getElementById(`dashboard-per${numero + 2}`),
        config
    );
}

let perguntas = [];

function validar(num) {
    let erros = ``;

    let radAltA = document.querySelector(`#radAltA${num - 1}`).checked;
    let radAltB = document.querySelector(`#radAltB${num - 1}`).checked;
    let radAltC = document.querySelector(`#radAltC${num - 1}`).checked;
    let radAltD = document.querySelector(`#radAltD${num - 1}`).checked;
    let radAltE = document.querySelector(`#radAltE${num - 1}`).checked;

    if (!radAltA && !radAltB && !radAltC && !radAltD && !radAltE) {
        erros += `<p> <img src="../img/icones/erroImg.png" alt="Icone de erro" class="iconesPeq"> Escolha alguma alternativa </p>`;
    }

    if (erros != '') {
        modal.style.display = 'flex';
        respostaModal.innerHTML = '<img src="../img/icones/erroImg.png" alt="Icone de erro" class="iconesGra">';
        respostaModal.innerHTML += erros;
    } else {
        let altEscolhida = '';

        if (radAltA) {
            altEscolhida = 'A';
        } else if (radAltB) {
            altEscolhida = 'B';
        } else if (radAltC) {
            altEscolhida = 'C';
        } else if (radAltD) {
            altEscolhida = 'D';
        } else {
            altEscolhida = 'E';
        }

        perguntas[num - 2] = {
            altEscolhida: altEscolhida
        }

        if (num < 6) {
            avancar(num);
        } else {
            finalizar();
        }
    }
}

function avancar(num) {
    carrossel.style.marginLeft = `-${num}00%`;
}

function voltar(num) {
    carrossel.style.marginLeft = `-${num - 1}00%`;
}

function subir() {
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 400);
}

async function finalizar() {
    for (let i = 1; i <= 5; i++) {
        await cadastrarResposta(i);
    }

    modal.style.display = 'flex';

    respostaModal.innerHTML = '<img src="../img/icones/certoImg.png" alt="Icone de certo" class="iconesGra">';
    respostaModal.innerHTML +=
        "<p> Quiz respondido com sucesso! Recarregando a página </p>";

    setTimeout(() => {
        window.location = "responder_quiz.html";
    }, "3000");
}

async function cadastrarResposta(num) {
    let id_quiz = sessionStorage.ID_QUIZ;
    let id_usuario = sessionStorage.ID_USUARIO;

    fetch(`/respostas/cadastrar`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id_quiz: id_quiz,
            id_usuario: id_usuario,
            num_pergunta: num,
            alternativa_escolhida: perguntas[num - 1].altEscolhida
        })
    }).then(function (resposta) {

        if (resposta.status == 404) {
            window.alert("Deu 404!");
        } else {
            throw ("Houve um erro ao tentar cadastrar a resposta! Código da resposta: " + resposta.status);
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
}

