const modal = document.querySelector('#modal-resposta');
const btnFechar = document.querySelector('#fechar');

btnFechar.addEventListener('click', fechar)

function fechar () {
    modal.style.display = 'none';
}

function carregar() {
    var modalCarregar = document.querySelector('#modal-carregar');
    modalCarregar.style.display = 'flex';
}

function fecharCarregar() {
    var modalCarregar = document.querySelector('#modal-carregar');
    modalCarregar.style.display = 'none';
}