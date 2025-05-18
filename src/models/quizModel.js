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

function listarPerguntas(idQuiz) {
    console.log("ACESSEI O QUIZ MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPerguntas(): ", idQuiz);

    var instrucaoSql = `
        SELECT * FROM pergunta WHERE fkquiz = ${idQuiz};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarRespostas(idQuiz) {
    console.log("ACESSEI O QUIZ MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarRespostas(): ", idQuiz);

    var instrucaoSql = `
        SELECT * FROM resposta WHERE fkquiz = ${idQuiz};
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

function cadastrarPergunta(numero, pergunta, alternativaA, alternativaB, alternativaC, alternativaD, alternativaE, alternativaCorreta, id) {
    console.log("ACESSEI O QUIZ MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", numero, pergunta, alternativaA, alternativaB, alternativaC, alternativaD, alternativaE, alternativaCorreta, id);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO pergunta (numero, fkquiz, pergunta, alternativaA, alternativaB, alternativaC, alternativaD, alternativaE, alternativaCorreta) VALUES (${numero}, ${id}, '${pergunta}', '${alternativaA}', '${alternativaB}', '${alternativaC}', '${alternativaD}', '${alternativaE}', '${alternativaCorreta}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrarResposta(id_usuario, id_quiz, num_pergunta, alternativa_escolhida) {
    console.log("ACESSEI O QUIZ MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarResposta():", id_usuario, id_quiz, num_pergunta, alternativa_escolhida);
   
    var instrucaoSql = `
        INSERT INTO resposta (fkusuario, fkquiz, fkpergunta, alternativaEscolhida) VALUES (${id_usuario}, ${id_quiz}, ${num_pergunta}, '${alternativa_escolhida}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrar,
    listar, 
    listarUltimo,
    cadastrarPergunta,
    listarPerguntas,
    listarRespostas,
    cadastrarResposta
};