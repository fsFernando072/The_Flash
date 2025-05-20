var database = require("../database/config")

function listarPerguntas(idQuiz) {
    console.log("ACESSEI O PERGUNTA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPerguntas(): ", idQuiz);

    var instrucaoSql = `
        SELECT * FROM pergunta WHERE fkquiz = ${idQuiz};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrarPergunta(numero, pergunta, alternativaA, alternativaB, alternativaC, alternativaD, alternativaE, alternativaCorreta, id) {
    console.log("ACESSEI O PERGUNTA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", numero, pergunta, alternativaA, alternativaB, alternativaC, alternativaD, alternativaE, alternativaCorreta, id);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO pergunta (numero, fkquiz, pergunta, alternativaA, alternativaB, alternativaC, alternativaD, alternativaE, alternativaCorreta) VALUES (${numero}, ${id}, '${pergunta}', '${alternativaA}', '${alternativaB}', '${alternativaC}', '${alternativaD}', '${alternativaE}', '${alternativaCorreta}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    listarPerguntas,
    cadastrarPergunta,
};