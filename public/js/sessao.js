function validarSessao() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;
    var caminhoImagem = sessionStorage.CAMINHO_IMAGEM;

    var imagem_usuario = document.getElementById("imagem_usuario")

    if (email != null && nome != null && caminhoImagem != null) {
        imagem_usuario.src = `../img/${caminhoImagem}`;
    } else {
        window.location = "../login.html";
    }
}

function limparSessao() {
    sessionStorage.clear();
    window.location = "../index.html";
}