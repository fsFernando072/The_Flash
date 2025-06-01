const botaoCadastrar = document.querySelector('#botaoCadastrar');
const respostaModal = document.querySelector('#respostas');

botaoCadastrar.addEventListener('click', verificar);

function verificar() {
    let nome = document.querySelector('#nome').value;
    let email = document.querySelector('#email').value;
    let senha = document.querySelector('#senha').value;
    let confSenha = document.querySelector('#conf_senha').value;

    let erros = ``;

    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (nome == '' || email == '' || senha == '' || confSenha == '') {
        erros += `<p>  <img src="img/icones/erroImg.png" alt="Icone de erro" class="iconesPeq"> Um ou mais campos estão vazios </p>`;
    }
    
    if (nome.length <= 1) {
        erros += `<p> <img src="img/icones/erroImg.png" alt="Icone de erro" class="iconesPeq"> O nome deve conter mais de 1 caracter </p>`;
    }
    
    if (!emailRegex.test(email)) {
        erros += `<p> <img src="img/icones/erroImg.png" alt="Icone de erro" class="iconesPeq"> O e-mail é inválido </p>`;
    }
    
    if (senha != confSenha) {
        erros += `<p> <img src="img/icones/erroImg.png" alt="Icone de erro" class="iconesPeq"> A senha deve ser igual a confirmação de senha </p>`;
    }

    if (erros != '') {
        modal.style.display = 'flex';
        respostaModal.innerHTML = '<img src="img/icones/erroImg.png" alt="Icone de erro" class="iconesGra">';
        respostaModal.innerHTML += erros;
    } else {
        modal.style.display = 'flex';
        respostaModal.innerHTML = erros;
    
        fetch("/usuarios/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nomeServer: nome,
                emailServer: email,
                senhaServer: senha
            }),
        })
            .then(function (resposta) {
                console.log("resposta: ", resposta);
    
                if (resposta.ok) {
                    modal.style.display = 'flex';
    
                    respostaModal.innerHTML = '<img src="img/icones/certoImg.png" alt="Icone de certo" class="iconesGra">';
                    respostaModal.innerHTML +=
                        "<p> Cadastro realizado com sucesso! Redirecionando para tela de Login... </p>";
    
                    setTimeout(() => {
                        window.location = "login.html";
                    }, "2000");
    
                } else {
                    throw "Houve um erro ao tentar realizar o cadastro!";
                }
            })
            .catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
            });
    }


    return false;
}