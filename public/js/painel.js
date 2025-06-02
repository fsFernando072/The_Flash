function exibir(tipo) {
    let tipoDashboard = document.querySelector(`#${tipo}`);
    let botoesTipos = document.querySelectorAll('.botoes-tipos button');

    tipoDashboard.style.display = 'block';

    let indice = 0;
    if (tipo == 'quizzes') {
        personagens.style.display = 'none';
        ranking.style.display = 'none';
        indice = 0;
    } else if (tipo == 'personagens') {
        quizzes.style.display = 'none';
        ranking.style.display = 'none';
        indice = 1;
    } else {
        quizzes.style.display = 'none';
        personagens.style.display = 'none';
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

function exibirGraficoQuiz(tipo) {
    let tipoDashboard = document.querySelector(`#${tipo}`);
    let botoesTipos = document.querySelectorAll('.botoes-tipos-quizzes button');

    tipoDashboard.style.display = 'block';

    let indice = 0;
    if (tipo == 'minhasRespostas') {
        meusQuizzes.style.display = 'none';
        indice = 0;
        botoesTipos[1].classList.remove('btn-selecionado');
    } else {
        minhasRespostas.style.display = 'none';
        indice = 1;
        botoesTipos[0].classList.remove('btn-selecionado');
    }

    if (!botoesTipos[indice].classList.contains('btn-selecionado')) {
        botoesTipos[indice].classList.add('btn-selecionado');
    }
}

function plotarGraficoQuizzes() {
    Chart.defaults.color = '#ffffff';
    Chart.defaults.font.size = 16;

    console.log('iniciando plotagem do gráfico...');

    let labels = ['Certas', 'Erradas'];

    let dados = {
        labels: labels,
        datasets: [{
            label: 'Usuários',
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

    dados.datasets[0].data.push(resposta.Certas);
    dados.datasets[0].data.push(resposta.Erradas);

    let config = {
        type: 'bar',
        data: dados,
        options: {
            plugins: {
                title: {
                    display: true,
                    text: `Respostas dos Usuários`,
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
        document.getElementById(`dashboard-quizzes`),
        config
    );
}

function buscarFavoritos() {
    fetch("/personagens/listarFavoritos")
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {
                if (resposta.statusText != 'No Content') {
                    resposta.json().then(function (resposta) {
                        plotarGraficoFavoritos(resposta);
                    });
                }
            } else {
                throw "Houve um erro ao tentar pegar as imagens!";
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}

function listarPorQuiz() {
    let idUsu = sessionStorage.ID_USUARIO;

    fetch(`/respostas/listarPorQuiz/${idUsu}`)
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {
                minhasRespostas.style.display = 'block';

                if (resposta.statusText != 'No Content') {
                    resposta.json().then(function (resposta) {
                        plotarGraficoRespostas(resposta);
                    });
                } else {
                    minhasRespostas.innerHTML = `<h2 class="titulo menor"> Você ainda não respondeu nenhum quiz </h2>`;
                    minhasRespostas.innerHTML += `<section class="secaoBotaoLink"> <a href="quiz.html" class="botaoLink"> Ver quizzes </a> </section>`;
                }
            } else {
                throw "Houve um erro ao tentar pegar as imagens!";
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}

function listarMeusQuizzes() {
    let idUsu = sessionStorage.ID_USUARIO;

    fetch(`/respostas/listarMeusQuizzes/${idUsu}`)
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {
                minhasRespostas.style.display = 'block';

                if (resposta.statusText != 'No Content') {
                    resposta.json().then(function (resposta) {
                        plotarGraficoQuizzes(resposta);
                    });
                } else {
                    meusQuizzes.innerHTML = `<h2 class="titulo menor"> Seus quizzes ainda não possuem nenhuma resposta </h2>`;
                    meusQuizzes.innerHTML += `<section class="secaoBotaoLink"> <a href="quiz.html" class="botaoLink"> Ver quizzes </a> </section>`;
                }
            } else {
                throw "Houve um erro ao tentar pegar as imagens!";
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}

function plotarGraficoFavoritos(resposta) {
    Chart.defaults.color = '#ffffff';
    Chart.defaults.font.size = 16;

    console.log('iniciando plotagem do gráfico...');

    let labels = [];

    let dados = {
        labels: labels,
        datasets: [{
            label: 'Quantidade',
            data: [],
            backgroundColor: [
                'rgb(250, 177, 16)',
            ],
            borderColor: [
                'rgb(250, 121, 16)',
            ],
            borderWidth: 4
        },
        ]
    };

    let indicadores = document.querySelectorAll('#kpi-personagens .indicador p');
    let indiceMaiorQtd = 0;

    for (let i = 0; i < resposta.length; i++) {
        if (sessionStorage.FK_FAVORITO != 'null') {
            if (resposta[i].id == sessionStorage.FK_FAVORITO) {
                indicadores[0].innerHTML = resposta[i].nome;
                indicadores[1].innerHTML = resposta[i].qtd;
            }
        } else {
            indicadores[0].innerHTML = 'Você não possui um personagem favorito';
            indicadores[1].innerHTML = 'Você não possui um personagem favorito';
        }

        if (resposta[i].qtd > resposta[indiceMaiorQtd].qtd) {
            indiceMaiorQtd = i;
        }

        dados.labels.push(resposta[i].nome);
        dados.datasets[0].data.push(resposta[i].qtd);
    }

    indicadores[2].innerHTML = resposta[indiceMaiorQtd].nome;

    let config = {
        type: 'bar',
        data: dados,
        options: {
            plugins: {
                title: {
                    display: true,
                    text: `Personagens favoritos dos usuários`,
                    font: {
                        size: 28
                    },
                }
            },
            scale: {
                ticks: {
                    precision: 0
                }
            }
        }
    }

    let meuGrafico = new Chart(
        document.getElementById(`dashboard-favoritos`),
        config
    );
}

function plotarGraficoRespostas(resposta) {
    Chart.defaults.color = '#ffffff';
    Chart.defaults.font.size = 16;

    console.log('iniciando plotagem do gráfico...');

    let labels = [];

    let dados = {
        labels: labels,
        datasets: [{
            label: 'Acertos',
            data: [],
            backgroundColor: [
                'rgba(11, 188, 11, 0.8)',
            ],
            borderColor: [
                'rgb(0, 78, 0)',
            ],
            borderWidth: 4
        },
        {
            label: 'Erros',
            data: [],
            backgroundColor: [
                'rgba(163, 5, 32, 0.8)',
            ],
            borderColor: [
                'rgb(82, 3, 16)',
            ],
            borderWidth: 4
        },
        ]
    };

    let indicadores = document.querySelectorAll('#kpi-minhas-respostas .indicador p');
    let indiceMaisAcertos = 0;
    let indiceMaisErros = 0;
    let soma = 0;

    for (let i = 0; i < resposta.length; i++) {
        if (resposta[i].acertos > resposta[indiceMaisAcertos].acertos) {
            indiceMaisAcertos = i;
        }

        if (5 - resposta[i].acertos > 5 - resposta[indiceMaisErros].acertos) {
            indiceMaisErros = i;
        }

        soma += Number(resposta[i].acertos);

        dados.labels.push(resposta[i].titulo);
        dados.datasets[0].data.push(resposta[i].acertos);
        dados.datasets[1].data.push(5 - Number(resposta[i].acertos));
    }
    
    let media = soma / resposta.length;

    indicadores[0].innerHTML = `${resposta[indiceMaisAcertos].titulo}`;
    indicadores[1].innerHTML = `${resposta[indiceMaisErros].titulo}`;
    indicadores[2].innerHTML = `${media.toFixed(1)}`;

    let config = {
        type: 'bar',
        data: dados,
        options: {
            plugins: {
                title: {
                    display: true,
                    text: `Meus acertos e erros nos Quizzes`,
                    font: {
                        size: 28
                    },
                }
            },
            scale: {
                ticks: {
                    precision: 0
                }
            }
        }
    }

    let meuGrafico = new Chart(
        document.getElementById(`dashboard-minhas-respostas`),
        config
    );
}

function plotarGraficoQuizzes(resposta) {
    Chart.defaults.color = '#ffffff';
    Chart.defaults.font.size = 16;

    console.log('iniciando plotagem do gráfico...');

    let labels = [];

    let dados = {
        labels: labels,
        datasets: [{
            label: 'Total de questões respondidas',
            data: [],
            backgroundColor: [
                'rgb(250, 177, 16)',
            ],
            borderColor: [
                'rgb(250, 121, 16)',
            ],
            borderWidth: 4
        },
        {
            label: 'Total de Acertos',
            data: [],
            backgroundColor: [
                'rgba(11, 188, 11, 0.8)',
            ],
            borderColor: [
                'rgb(0, 78, 0)',
            ],
            borderWidth: 4
        },
        ]
    };

    let indicadores = document.querySelectorAll('#kpi-meus-quizzes .indicador p');
    let indiceMaisRespostas = 0;
    let indiceMaisAcertos = 0;
    let soma = 0;

    for (let i = 0; i < resposta.length; i++) {
        if (resposta[i].totalRespostas > resposta[indiceMaisRespostas].totalRespostas) {
            indiceMaisRespostas = i;
        }

        if (resposta[i].acertos > resposta[indiceMaisAcertos].acertos) {
            indiceMaisAcertos = i;
        }

        soma += Number(resposta[i].acertos);

        dados.labels.push(resposta[i].titulo);
        dados.datasets[0].data.push(resposta[i].totalRespostas);
        dados.datasets[1].data.push(resposta[i].acertos);
    }

    let media = soma / resposta.length;

    indicadores[0].innerHTML = `${resposta[indiceMaisAcertos].titulo}`;
    indicadores[1].innerHTML = `${resposta[indiceMaisRespostas].titulo}`;
    indicadores[2].innerHTML = `${media.toFixed(1)}`;

    let config = {
        type: 'bar',
        data: dados,
        options: {
            plugins: {
                title: {
                    display: true,
                    text: `Respostas dos meus quizzes`,
                    font: {
                        size: 28
                    },
                }
            },
            scale: {
                ticks: {
                    precision: 0
                }
            }
        }
    }

    let meuGrafico = new Chart(
        document.getElementById(`dashboard-meus-quizzes`),
        config
    );
}

function listarRanking() {
    fetch("/respostas/listarRanking")
        .then(function (resposta) {
            console.log("resposta: ", resposta);
            let tabela = document.querySelector('#ranking table');
            let conteudo = '';

            let indicadores = document.querySelectorAll('#kpi-ranking .indicador p');
            let respondeu = false;

            if (resposta.ok) {
                if (resposta.statusText != 'No Content') {
                    resposta.json().then(function (resposta) {
                        for (let i = 0; i < resposta.length; i++) {
                            if (resposta[i].id == sessionStorage.ID_USUARIO) {
                                conteudo += `<tr class="usu">`;
                                respondeu = true;

                                indicadores[0].innerHTML = `#${i + 1}`;
                                indicadores[1].innerHTML = `${resposta[i].acertos}`;
                                indicadores[2].innerHTML = `${(resposta[i].acertos / resposta[i].totalQuestoes * 100).toFixed(1)}%`;
                            } else {
                                conteudo += `<tr>`;
                            }

                            conteudo += `
                                <td> #${i + 1} </td>
                                <td> <p>
                                    <img src="../img/${resposta[i].caminhoImagem}" alt="Imagem do Usuário" class="img-usu">
                                    ${resposta[i].nome}
                                    </p> 
                                </td>
                                <td> ${resposta[i].acertos} </td>
                                <td> ${resposta[i].totalQuestoes} </td>
                                <td> ${(resposta[i].acertos / resposta[i].totalQuestoes * 100).toFixed(1)}% </td>
                            </tr>`;
                        }

                        if (!respondeu) {
                            indicadores[0].innerHTML = `Você ainda não respondeu nenhum quiz`;
                            indicadores[1].innerHTML = `Você ainda não respondeu nenhum quiz`;
                            indicadores[2].innerHTML = `Você ainda não respondeu nenhum quiz`;
                        }

                        tabela.innerHTML += conteudo;
                    });
                }
            } else {
                throw "Houve um erro ao tentar listar o ranking!";
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}