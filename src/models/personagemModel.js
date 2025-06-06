var database = require("../database/config")

function pegarImagens() {
    console.log("ACESSEI O PERSONAGEM MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pegarImagens(): ");

    var instrucaoSql = `
        SELECT caminhoImagem FROM personagem;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listar() {
    console.log("ACESSEI O PERSONAGEM MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar(): ");

    var instrucaoSql = `
        SELECT id,
            nome,
            descricao,
            categoria,
            caminhoImagem
        FROM personagem;

    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function pesquisar(pesquisa) {
    console.log("ACESSEI O PERSONAGEM MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pesquisar(): ", pesquisa);

    var instrucaoSql = `
        SELECT id,
            nome,
            descricao,
            categoria,
            caminhoImagem
        FROM personagem
        WHERE nome LIKE '%${pesquisa}%' || descricao LIKE '%${pesquisa}%';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarFavorito(idPersonagem) {
    console.log("ACESSEI O PERSONAGEM MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarFavorito(): ");

    var instrucaoSql = `
         SELECT id,
            nome,
            descricao,
            categoria,
            caminhoImagem
        FROM personagem WHERE id = ${idPersonagem};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarFavoritos() {
    console.log("ACESSEI O PERSONAGEM MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarFavoritos(): ");

    var instrucaoSql = `
         SELECT COUNT(fkpersonagemfavorito) qtd,
            per.nome,
            per.id
        FROM usuario usu
        INNER JOIN personagem per ON per.id = usu.fkpersonagemfavorito
        GROUP BY fkpersonagemfavorito;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    pegarImagens,
    listar,
    pesquisar,
    buscarFavorito,
    listarFavoritos
};