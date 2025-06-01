const botaoEditar = document.querySelector('#botaoEditar');
const respostaModal = document.querySelector('#respostas');

botaoEditar.addEventListener('click', editarPerfil);

const fotoPerfil = document.getElementById('foto_perfil');

function carregarPerfil() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;
    var caminhoImagem = sessionStorage.CAMINHO_IMAGEM;

    var campoEmail = document.getElementById('email');
    var campoNome = document.getElementById('nome');

    if (email != null && nome != null && caminhoImagem != null) {
        fotoPerfil.src = `../img/${caminhoImagem}`;
        campoEmail.value = email;
        campoNome.value = nome;
    }
}

const modalPerfil = document.querySelector('#modal-perfil');
const btnFecharModalPerfil = document.querySelector('#fechar-modal-perfil');

btnFecharModalPerfil.addEventListener('click', fecharModalPerfil);

function fecharModalPerfil() {
    modalPerfil.style.display = 'none';
}

function alterarImagem() {
    modalPerfil.style.display = 'flex';

    fetch("/personagens/imagens")
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {
                resposta.json().then(function (resposta) {
                    console.log("Dados recebidos: ", JSON.stringify(resposta));

                    let imagens = document.getElementById("imagens");
                    let frase = '<img src="../img/icones/usuarioPadraoImg.png" alt="Imagem padrão usuário">';

                    console.log(fotoPerfil.src);

                    if (fotoPerfil.src.includes(`img/icones/usuarioPadraoImg.png`)) {
                        frase = '<img src="../img/icones/usuarioPadraoImg.png" alt="Imagem padrão usuário" class="selecionado">';
                    }

                    for (let i = 0; i < resposta.length; i++) {
                        if (fotoPerfil.src.includes(`img/${resposta[i].caminhoImagem}`)) {
                            frase += `<img src="../img/${resposta[i].caminhoImagem}" alt="Imagem dos Personagens" class="selecionado">`;
                        } else {
                            frase += `<img src="../img/${resposta[i].caminhoImagem}" alt="Imagem dos Personagens">`;
                        }
                    }

                    imagens.innerHTML = frase;
                    let imgs = document.querySelectorAll('#imagens img');

                    imgs.forEach(img => {
                        img.addEventListener("click", () => {
                            fotoPerfil.src = img.src;
                            fecharModalPerfil();
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

function editarPerfil() {
    carregar();
    let nome = document.querySelector('#nome').value;
    let email = document.querySelector('#email').value;
    let novaSenha = document.querySelector('#senha').value;
    let caminhoImagem = document.querySelector('#foto_perfil').src;
    let indice = caminhoImagem.indexOf('img/');
    caminhoImagem = caminhoImagem.substring(indice + 4, caminhoImagem.length);
    let id = sessionStorage.ID_USUARIO;

    let erros = ``;

    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (novaSenha == '') {
        novaSenha = sessionStorage.SENHA;
    }

    if (!emailRegex.test(email)) {
        erros += `<p> <img src="../img/icones/erroImg.png" alt="Icone de erro" class="iconesPeq"> O e-mail é inválido </p>`;
    }

    if (nome.length <= 1) {
        erros += `<p> <img src="../img/icones/erroImg.png" alt="Icone de erro" class="iconesPeq"> O nome deve conter mais de 1 caracter </p>`;
    }

    if (novaSenha.length < 2) {
        erros += `<p> <img src="../img/icones/erroImg.png" alt="Icone de erro" class="iconesPeq"> A nova senha deve possuir no mínimo 2 caracteres </p>`;
    }

    if (erros != '') {
        fecharCarregar();
        modal.style.display = 'flex';
        respostaModal.innerHTML = '<img src="../img/icones/erroImg.png" alt="Icone de erro" class="iconesGra">';
        respostaModal.innerHTML += erros;
    } else {
        modal.style.display = 'flex';
        respostaModal.innerHTML = erros;
        fetch(`/usuarios/editar`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nome: nome,
                email: email,
                senha: novaSenha,
                caminhoImagem: caminhoImagem,
                id: id
            })
        }).then(function (resposta) {

            if (resposta.ok) {
                fecharCarregar();
                modal.style.display = 'flex';
    
                respostaModal.innerHTML = '<img src="../img/icones/certoImg.png" alt="Icone de certo" class="iconesGra">';
                respostaModal.innerHTML +=
                    "<p> Alteração do perfil realizada com sucesso! Recarregando a página... </p>";

                sessionStorage.EMAIL_USUARIO = email;
                sessionStorage.NOME_USUARIO = nome;
                sessionStorage.SENHA = novaSenha;
                sessionStorage.CAMINHO_IMAGEM = caminhoImagem;

                setTimeout(() => {
                    window.location = "perfil.html";
                }, "3000");
            } else if (resposta.status == 404) {
                window.alert("Deu 404!");
            } else {
                throw ("Houve um erro ao tentar realizar o update! Código da resposta: " + resposta.status);
            }
        }).catch(function (resposta) {
            fecharCarregar();
            console.log(`#ERRO: ${resposta}`);
        });
    }
}

function excluir() {
    let modalExcluir = document.querySelector('#modal-excluir');
    modalExcluir.style.display = 'flex';

    let secaoExcluir = modalExcluir.querySelector('.excluir');

    var frase = `<section class="img-excluir"> 
                    <img src="../img/icones/lixeiraImg.png" alt="Icone de lixeira" class="iconesGra"> 
                </section>`;
    frase += '<h1> Você tem certeza que deseja excluir sua conta? </h1>';
    frase += `<p> Esta ação não é reversível. </p>`;
    frase += `<section class="botoes-modal-excluir">
        <button onclick="fecharExcluir()" class="botaoLink"> Cancelar </button>
        <button onclick="deletar()" class="botaoLink"> Excluir </button>
    </section>`;

    secaoExcluir.innerHTML = frase;
}

function deletar() {
    fecharExcluir();
    carregar();

    let id = sessionStorage.ID_USUARIO;
    console.log(id);

    fetch("/usuarios/excluir", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: id
        }),
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {
                fecharCarregar();
                modal.style.display = 'flex';

                respostaModal.innerHTML = '<img src="../img/icones/certoImg.png" alt="Icone de certo" class="iconesGra">';
                respostaModal.innerHTML +=
                    "<p> Perfil deletado com sucesso! Redirecionando para a página inicial... </p>";

                setTimeout(() => {
                    window.location = "../index.html";
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

let novaSenha = document.querySelector('#senha');
novaSenha.style.display = 'none';

let labelNovaSenha = document.querySelector('.label-nova-senha');

labelNovaSenha.addEventListener('click', exibirInput);

function exibirInput() {
    novaSenha.style.display = 'flex';
}