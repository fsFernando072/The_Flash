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