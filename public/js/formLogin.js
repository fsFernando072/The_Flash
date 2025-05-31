const botaoEntrar = document.querySelector('#botaoEntrar');
const respostaModal = document.querySelector('#respostas');

botaoEntrar.addEventListener('click', verificar);

function verificar() {
    carregar();
    let email = document.querySelector('#email').value;
    let senha = document.querySelector('#senha').value;

    let erros = ``;

    if (email == '' || senha == '') {
        erros += `<p>  <img src="img/icones/erroImg.png" alt="Icone de erro" class="iconesPeq"> O e-mail e/ou senha não podem ser vazios </p>`;
    }

    if (erros != '') {
        fecharCarregar();
        modal.style.display = 'flex';
        respostaModal.innerHTML = '<img src="img/icones/erroImg.png" alt="Icone de erro" class="iconesGra">';
        respostaModal.innerHTML += erros;
    } else {
        fetch("/usuarios/autenticar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                emailServer: email,
                senhaServer: senha
            })
        }).then(function (resposta) {
            console.log("ESTOU NO THEN DO entrar()!")

            if (resposta.ok) {
                console.log(resposta);

                resposta.json().then(json => {
                    console.log(json);
                    console.log(JSON.stringify(json));
                    sessionStorage.EMAIL_USUARIO = json.email;
                    sessionStorage.NOME_USUARIO = json.nome;
                    sessionStorage.ID_USUARIO = json.id;
                    sessionStorage.CAMINHO_IMAGEM = json.caminhoImagem;
                    sessionStorage.SENHA = json.senha;
                    sessionStorage.FK_FAVORITO = json.fkFavorito;

                    setTimeout(function () {
                        window.location = "./pages/painel.html";
                    }, 1000);

                });

            } else {

                console.log("Houve um erro ao tentar realizar o login!");

                resposta.text().then(texto => {
                    console.error(texto);
                    fecharCarregar()
                    modal.style.display = 'flex';
                    respostaModal.innerHTML = '<img src="img/icones/erroImg.png" alt="Icone de erro" class="iconesGra">';
                    respostaModal.innerHTML += `<p> <img src="img/icones/erroImg.png" alt="Icone de erro" class="iconesPeq"> ${texto} </p>`;
                });
            }

        }).catch(function (erro) {
            console.log(erro);
        })

    }
    
    return false;
}