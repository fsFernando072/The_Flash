const carrossel = document.querySelector('.carrossel');
const respostaModal = document.querySelector('#respostas');

const modalQuiz = document.querySelector('#modal-quiz');
const btnFecharModalQuiz = document.querySelector('#fechar-modal-quiz');

btnFecharModalQuiz.addEventListener('click', fecharModalQuiz);

let senha = document.querySelector('#senha');
let labelSenha = document.querySelector('#label-senha');

senha.style.display = 'none';
labelSenha.style.display = 'none';

function exibirSenha() {
    let senha = document.querySelector('#senha');
    let labelSenha = document.querySelector('#label-senha');
    let tipo = document.querySelector('#tipo');

    if (tipo.value == 'publico') {
        labelSenha.style.display = 'none';
        senha.style.display = 'none'
    } else {
        labelSenha.style.display = 'flex';
        senha.style.display = 'flex';
    }
}

function fecharModalQuiz() {
    modalQuiz.style.display = 'none';
}

let perguntas = [];

function validar(num) {
    if (num == 1) {
        let titulo = document.querySelector('#titulo').value;
        let descricao = document.querySelector('#descricao').value;
        let tipo = document.querySelector('#tipo').value;
        let senha = document.querySelector('#senha').value;

        let erros = ``;

        if (titulo == '' || descricao == '') {
            erros += `<p> <img src="../img/icones/erroImg.png" alt="Icone de erro" class="iconesPeq"> O titulo e a descrição não podem ser vazios </p>`;
        }

        if (tipo == 'privado') {
            if (senha.length < 4) {
                erros += `<p> <img src="../img/icones/erroImg.png" alt="Icone de erro" class="iconesPeq"> A senha deve conter no mínimo 4 caracteres </p>`;
            }
        }

        if (erros != '') {
            modal.style.display = 'flex';
            respostaModal.innerHTML = '<img src="../img/icones/erroImg.png" alt="Icone de erro" class="iconesGra">';
            respostaModal.innerHTML += erros;
        } else {
            avancar(num)
        }
    } else {
        let erros = ``;
        let pergunta = document.querySelector(`#pergunta${num - 1}`).value;

        let altA = document.querySelector(`#per${num - 1}AltA`).value;
        let altB = document.querySelector(`#per${num - 1}AltB`).value;
        let altC = document.querySelector(`#per${num - 1}AltC`).value;
        let altD = document.querySelector(`#per${num - 1}AltD`).value;
        let altE = document.querySelector(`#per${num - 1}AltE`).value;

        let radAltA = document.querySelector(`#radAltA${num - 1}`).checked;
        let radAltB = document.querySelector(`#radAltB${num - 1}`).checked;
        let radAltC = document.querySelector(`#radAltC${num - 1}`).checked;
        let radAltD = document.querySelector(`#radAltD${num - 1}`).checked;
        let radAltE = document.querySelector(`#radAltE${num - 1}`).checked;

        if (pergunta == '' || altA == '' || altB == '' || altC == '' || altD == '' || altE == '') {
            erros += `<p> <img src="../img/icones/erroImg.png" alt="Icone de erro" class="iconesPeq"> A pergunta ${num - 1} e as alternativas não podem ser vazias </p>`;
        }

        if (!radAltA && !radAltB && !radAltC && !radAltD && !radAltE) {
            erros += `<p> <img src="../img/icones/erroImg.png" alt="Icone de erro" class="iconesPeq"> Escolha alguma alternativa como certa </p>`;
        }

        if (erros != '') {
            modal.style.display = 'flex';
            respostaModal.innerHTML = '<img src="../img/icones/erroImg.png" alt="Icone de erro" class="iconesGra">';
            respostaModal.innerHTML += erros;
        } else {
            let altCorreta = '';

            if (radAltA) {
                altCorreta = 'A';
            } else if (radAltB) {
                altCorreta = 'B';
            } else if (radAltC) {
                altCorreta = 'C';
            } else if (radAltD) {
                altCorreta = 'D';
            } else {
                altCorreta = 'E';
            }

            perguntas[num - 2] = {
                pergunta: pergunta,
                alternativaA: altA,
                alternativaB: altB,
                alternativaC: altC,
                alternativaD: altD,
                alternativaE: altE,
                alternativaCorreta: altCorreta
            }

            console.log(perguntas[num - 2]);


            if (num < 6) {
                avancar(num);
            } else {
                finalizar();
            }
        }
    }
}

async function finalizar() {
    cadastrarQuiz();
}

async function cadastrarQuiz() {
    carregar();

    let titulo = document.querySelector('#titulo').value;
    let descricao = document.querySelector('#descricao').value;
    let tipo = document.querySelector('#tipo').value;
    let senha = document.querySelector('#senha').value;
    let caminhoImagem = document.querySelector('#foto_quiz').src;
    let indice = caminhoImagem.indexOf('img/');
    caminhoImagem = caminhoImagem.substring(indice + 4, caminhoImagem.length);

    let id = sessionStorage.ID_USUARIO;

    if (tipo == 'publico') {
        senha = '';
    }

    fetch(`/quiz/cadastrar`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            titulo: titulo,
            descricao: descricao,
            senha: senha,
            caminhoImagem,
            id: id
        })
    }).then(function (resposta) {

        if (resposta.ok) {
            listarQuiz();
        } else if (resposta.status == 404) {
            window.alert("Deu 404!");
        } else {
            throw ("Houve um erro ao tentar cadastrar o quiz! Código da resposta: " + resposta.status);
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
}

async function listarQuiz() {
    let idUsu = sessionStorage.ID_USUARIO;

    fetch(`/quiz/listarUltimo/${idUsu}`)
        .then(function (resposta) {
            if (resposta.ok) {
                console.log(resposta);

                resposta.json().then(json => {
                    console.log(json);
                    console.log(JSON.stringify(json));

                    for (let i = 1; i <= 5; i++) {
                        cadastrarPergunta(i, json[0].id);
                    }

                    fecharCarregar();
                    modal.style.display = 'flex';

                    respostaModal.innerHTML = '<img src="../img/icones/certoImg.png" alt="Icone de certo" class="iconesGra">';
                    respostaModal.innerHTML +=
                        "<p> Quiz criado com sucesso! Redirecionando para a página de quizzes </p>";

                    setTimeout(() => {
                        window.location = "quiz.html";
                    }, "3000");
                });
            } if (resposta.status == 404) {
                window.alert("Deu 404!");
            } else {
                throw ("Houve um erro ao tentar listar o quiz! Código da resposta: " + resposta.status);
            }
        }).catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}

async function cadastrarPergunta(num, idquiz) {
    console.log(idquiz);

    fetch(`/perguntas/cadastrar`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            numero: num,
            pergunta: perguntas[num - 1].pergunta,
            alternativaA: perguntas[num - 1].alternativaA,
            alternativaB: perguntas[num - 1].alternativaB,
            alternativaC: perguntas[num - 1].alternativaC,
            alternativaD: perguntas[num - 1].alternativaD,
            alternativaE: perguntas[num - 1].alternativaE,
            alternativaCorreta: perguntas[num - 1].alternativaCorreta,
            id: idquiz
        })
    }).then(function (resposta) {
        if (resposta.ok) {
            return 'ok';
        } else if (resposta.status == 404) {
            window.alert("Deu 404!");
        } else {
            throw ("Houve um erro ao tentar cadastrar o quiz! Código da resposta: " + resposta.status);
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
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

function exibirPerguntas() {
    let conteudo = '';
    for (let i = 1; i <= 5; i++) {
        conteudo += `<section class="addquiz">`;
        conteudo += `<h1 class="titulo"> Pergunta ${i} </h1>`;

        conteudo += `<label for="pergunta${i}"> Pergunta </label>`;
        conteudo += `<input type="text" name="pergunta${i}" id="pergunta${i}" placeholder="Digite a pergunta">`;

        conteudo += `<label for="radAltA${i}" class="alternativa"> <input type="radio" name="radAlt${i}" id="radAltA${i}"> Alternativa A </label>`;
        conteudo += `<input type="text" name="per${i}AltA" id="per${i}AltA" placeholder="Digite a alternativa A do quiz">`;

        conteudo += `<label for="radAltB${i}" class="alternativa"> <input type="radio" name="radAlt${i}" id="radAltB${i}"> Alternativa B </label>`;
        conteudo += `<input type="text" name="per${i}AltB" id="per${i}AltB" placeholder="Digite a alternativa B do quiz">`;

        conteudo += `<label for="radAltC${i}" class="alternativa"> <input type="radio" name="radAlt${i}" id="radAltC${i}"> Alternativa C </label>`;
        conteudo += `<input type="text" name="per${i}AltC" id="per${i}AltC" placeholder="Digite a alternativa C do quiz">`;

        conteudo += `<label for="radAltD${i}" class="alternativa"> <input type="radio" name="radAlt${i}" id="radAltD${i}"> Alternativa D </label>`;
        conteudo += `<input type="text" name="per${i}AltD" id="per${i}AltD" placeholder="Digite a alternativa D do quiz">`;

        conteudo += `<label for="radAltE${i}" class="alternativa"> <input type="radio" name="radAlt${i}" id="radAltE${i}"> Alternativa E </label>`;
        conteudo += `<input type="text" name="per${i}AltE" id="per${i}AltE" placeholder="Digite a alternativa E do quiz">`;

        conteudo += `<section class="botoes">`;
        conteudo += `<button onclick="voltar(${i}), subir()" class="botaoLink"> Voltar </button>`;

        if (i < 5) {
            conteudo += `<button onclick="validar(${i + 1}), subir()" class="botaoLink"> Avançar </button>`;
        } else {
            conteudo += `<button onclick="validar(${i + 1}), subir()" class="botaoLink"> Finalizar </button>`;
        }

        conteudo += `</section></section>`;
    }

    carrossel.innerHTML += conteudo;
}

function alterarImagem() {
    const fotoQuiz = document.getElementById('foto_quiz');
    modalQuiz.style.display = 'flex';

    fetch("/personagens/imagens")
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {
                resposta.json().then(function (resposta) {
                    console.log("Dados recebidos: ", JSON.stringify(resposta));

                    let imagens = document.getElementById("imagens");
                    let frase = '<img src="../img/fundo/hall.jpeg" alt="Imagem Star Labs">';

                    if (fotoQuiz.src.includes(`img/fundo/hall.jpeg`)) {
                        frase = '<img src="../img/fundo/hall.jpeg" alt="Imagem Star Labs" class="selecionado">';
                    }

                    for (let i = 0; i < resposta.length; i++) {
                        if (fotoQuiz.src.includes(`img/${resposta[i].caminhoImagem}`)) {
                            frase += `<img src="../img/${resposta[i].caminhoImagem}" alt="Imagem dos Personagens" class="selecionado">`;
                        } else {
                            frase += `<img src="../img/${resposta[i].caminhoImagem}" alt="Imagem dos Personagens">`;
                        }
                    }

                    imagens.innerHTML = frase;
                    let imgs = document.querySelectorAll('#imagens img');

                    imgs.forEach(img => {
                        img.addEventListener("click", () => {
                            fotoQuiz.src = img.src;
                            fecharModalQuiz();
                        })
                    });
                });
            } else {
                throw "Houve um erro ao tentar pegar as imagens!";
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}