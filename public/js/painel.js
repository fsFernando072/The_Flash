function exibir(tipo) {
    let tipoQuiz = document.querySelector(`#${tipo}`);
    let botoesTipos = document.querySelectorAll('.botoes-tipos button');

    tipoQuiz.style.display = 'block';

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

    for (let i = 0; i < resposta.length; i++) {
        dados.labels.push(resposta[i].nome);
        dados.datasets[0].data.push(resposta[i].qtd);
    }

    let config = {
        type: 'bar',
        data: dados,
        options: {
            plugins: {
                title: {
                    display: true,
                    text: `Personagens favoritos dos Usuários`,
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

function listarRanking() {
    fetch("/respostas/listarRanking")
        .then(function (resposta) {
            console.log("resposta: ", resposta);
            let tabela = document.querySelector('#ranking table');
            let conteudo = '';

            if (resposta.ok) {
                if (resposta.statusText != 'No Content') {
                    resposta.json().then(function (resposta) {
                        for (let i = 0; i < resposta.length; i++) {
                            conteudo += `<tr>
                                <td> #${i + 1} </td>
                                <td> <p>
                                    <img src="../img/${resposta[i].caminhoImagem}" alt="Imagem do Usuário" class="img-usu">
                                    ${resposta[i].nome}
                                    </p> 
                                </td>
                                <td> ${resposta[i].acertos} </td>
                                <td> ${resposta[i].totalQuestoes} </td>
                            </tr>`;
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