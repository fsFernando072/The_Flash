var database = require("../database/config")

function cadastrar(titulo, descricao, senha, caminhoImagem, id) {
    console.log("ACESSEI O QUIZ MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", titulo, descricao, senha, caminhoImagem, id);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO quiz (titulo, descricao, senha, caminhoImagem, fkusuario) VALUES ('${titulo}', '${descricao}', '${senha}', '${caminhoImagem}', ${id});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listar() {
    console.log("ACESSEI O QUIZ MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar(): ");

    var instrucaoSql = `
        SELECT qui.titulo,
            qui.id,
             qui.descricao,
             qui.senha senhaQuiz,
             qui.caminhoImagem imgQuiz,
             usu.nome,
             usu.caminhoImagem imgUsu,
             qui.fkusuario
             FROM quiz qui
        INNER JOIN usuario usu ON usu.id = qui.fkusuario;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarSelecionado(id) {
    console.log("ACESSEI O QUIZ MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarSelecionado(): ", id);

    var instrucaoSql = `
        SELECT qui.titulo,
            qui.id,
             qui.descricao,
             qui.senha senhaQuiz,
             qui.caminhoImagem imgQuiz,
             usu.nome,
             usu.caminhoImagem imgUsu,
             qui.fkusuario
             FROM quiz qui
        INNER JOIN usuario usu ON usu.id = qui.fkusuario
        WHERE qui.id = ${id};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarUltimo(id) {
    console.log("ACESSEI O QUIZ MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarUltimo(): ");

    var instrucaoSql = `
        SELECT id FROM quiz WHERE fkusuario = ${id} ORDER BY id DESC LIMIT 1;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function pesquisar(pesquisa) {
    console.log("ACESSEI O QUIZ MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pesquisar(): ", pesquisa);

    var instrucaoSql = `
        SELECT qui.titulo,
            qui.id,
             qui.descricao,
             qui.senha senhaQuiz,
             qui.caminhoImagem imgQuiz,
             usu.nome,
             usu.caminhoImagem imgUsu,
             qui.fkusuario
             FROM quiz qui
        INNER JOIN usuario usu ON usu.id = qui.fkusuario
        WHERE titulo = '${pesquisa}' || descricao = '$pesquisa';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrar,
    listar, 
    listarUltimo,
    listarSelecionado,
    pesquisar
};