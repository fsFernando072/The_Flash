function carregarPerfil() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;
    var caminhoImagem = sessionStorage.CAMINHO_IMAGEM;

    var campoEmail = document.getElementById('email');
    var fotoPerfil = document.getElementById('foto_perfil');

    if (email != null && nome != null && caminhoImagem != null) {
        fotoPerfil.src = `../img/${caminhoImagem}`;
        campoEmail.value = email;
    }
}

const modalPerfil = document.querySelector('#modal-perfil');
const btnFecharModalPerfil = document.querySelector('#fechar-modal-perfil');

btnFecharModalPerfil.addEventListener('click', fecharModalPerfil)

function fecharModalPerfil () {
    modalPerfil.style.display = 'none';
}

function alterarImagem() {
    modalPerfil.style.display = 'flex';

    fetch("/usuarios/imagens")
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {
                resposta.json().then(function (resposta) {
                    console.log("Dados recebidos: ", JSON.stringify(resposta));

                    var imagens = document.getElementById("imagens");
                    let frase = '';

                    for (let i = 0; i < resposta.length; i++) {
                        frase += `<img src="../img/${resposta[i].caminhoImagem}" alt="Imagem dos Personagens">`;
                    }

                    imagens.innerHTML = frase;
                });
            } else {
                throw "Houve um erro ao tentar pegar as imagens!";
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}