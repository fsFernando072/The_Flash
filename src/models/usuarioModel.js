var database = require("../database/config");
var quizModel = require("./quizModel");

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT id, nome, email, caminhoImagem, senha, fkpersonagemfavorito FROM usuario WHERE email = '${email}' AND senha = SHA2('${senha}', 256);
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrar(nome, email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);
    
    var instrucaoSql = `
        INSERT INTO usuario (nome, email, senha, caminhoImagem) VALUES ('${nome}', '${email}', SHA2('${senha}', 256), 'icones/usuarioPadraoImg.png');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function atualizarPerfil(id, nome, email, senha, caminhoImagem) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pegarImagens(): ");

    var instrucaoSql = `
        UPDATE usuario SET nome = '${nome}', email = '${email}', senha = '${senha}', caminhoImagem = '${caminhoImagem}' WHERE id = ${id};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function favoritarPersonagem(idPersonagem, idUsuario) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function favoritarPersonagem(): ");

    var instrucaoSql = `
        UPDATE usuario SET fkpersonagemfavorito = ${idPersonagem} WHERE id = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

async function excluir(id) {
    console.log("ACESSEI O USUÁRIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function excluir(): ");

    await deletarRespostas(id);

    let quizzes = await listarQuizzes(id);

    for (let i = 0; i < quizzes.length; i++) {
        await quizModel.excluir(quizzes[i].id);
    }

    var instrucaoSql = `
        DELETE FROM usuario
        WHERE id = ${id};
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarQuizzes(idUsu) {
    var instrucaoSql = `SELECT * FROM quiz WHERE fkusuario = ${idUsu};`;
    
    return database.executar(instrucaoSql);
}

function deletarRespostas(idUsu) {
    var instrucaoSql = `DELETE FROM resposta WHERE fkusuario = ${idUsu};`;
    
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar,
    atualizarPerfil,
    favoritarPersonagem,
    excluir
};