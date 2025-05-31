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

function listarRanking() {
    console.log("ACESSEI O RESPOSTA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarRanking(): ");

    var instrucaoSql = `
        SELECT usu.id, 
            usu.nome,
            usu.caminhoImagem,
            SUM(CASE 
                WHEN alternativaEscolhida = alternativaCorreta THEN 1
                ELSE 0
                END) as acertos,
			COUNT(res.fkpergunta) as totalQuestoes
        FROM resposta res
        INNER JOIN pergunta per ON per.fkquiz = res.fkquiz AND per.numero = res.fkpergunta
        INNER JOIN usuario usu ON usu.id = res.fkusuario
        GROUP BY fkusuario
        ORDER BY acertos desc, totalQuestoes;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    listarRespostas,
    cadastrarResposta,
    listarRanking
};