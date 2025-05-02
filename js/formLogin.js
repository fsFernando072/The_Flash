const botaoEntrar = document.querySelector('#botaoEntrar');
const respostaModal = document.querySelector('#respostas');

botaoEntrar.addEventListener('click', verificar);

function verificar() {
    let emailDigitado = document.querySelector('#email').value;
    let senhaDigitada = document.querySelector('#senha').value;

    let erros = `<img src="img/icones/erroImg.png" alt="Icone de erro" class="iconesGra">`;

    if (emailDigitado == '' || senhaDigitada == '') {
        erros += `<p>  <img src="img/icones/erroImg.png" alt="Icone de erro" class="iconesPeq"> O email e/ou senha não podem ser vazios </p>`;
    } 

    modal.style.display = 'flex';
    console.log('entrei')
    respostaModal.innerHTML = erros;
}