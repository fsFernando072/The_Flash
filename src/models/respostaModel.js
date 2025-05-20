var database = require("../database/config")

function listarRespostas(idQuiz) {
    console.log("ACESSEI O RESPOSTA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarRespostas(): ", idQuiz);

    var instrucaoSql = `
        SELECT * FROM resposta WHERE fkquiz = ${idQuiz};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrarResposta(id_usuario, id_quiz, num_pergunta, alternativa_escolhida) {
    console.log("ACESSEI O RESPOSTA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarResposta():", id_usuario, id_quiz, num_pergunta, alternativa_escolhida);
   
    var instrucaoSql = `
        INSERT INTO resposta (fkusuario, fkquiz, fkpergunta, alternativaEscolhida) VALUES (${id_usuario}, ${id_quiz}, ${num_pergunta}, '${alternativa_escolhida}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    listarRespostas,
    cadastrarResposta,
};