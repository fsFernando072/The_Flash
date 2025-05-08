const modal = document.querySelector('#modal-resposta');
const btnFechar = document.querySelector('#fechar');

btnFechar.addEventListener('click', fechar)

function fechar () {
    modal.style.display = 'none';
}