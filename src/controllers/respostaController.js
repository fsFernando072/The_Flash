var respostaModel = require("../models/respostaModel");

function listarRespostas(req, res) {
    var id = req.params.idQuiz;

    respostaModel.listarRespostas(id)
        .then(
            function(resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum resultado encontrado!")
                }
            }
        ).catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar as respostas do quiz: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function cadastrarResposta(req, res) {
    var id_usuario = req.body.id_usuario;
    var id_quiz = req.body.id_quiz;
    var num_pergunta = req.body.num_pergunta;
    var alternativa_escolhida = req.body.alternativa_escolhida;

    if (id_usuario == undefined) {
        res.status(400).send("Seu id de usuário está undefined!");
    } else if (id_quiz == undefined) {
        res.status(400).send("Seu id de quiz está undefined!");
    } else if (num_pergunta == undefined) {
        res.status(400).send("Seu número de pergunta está undefined!");
    } else if (alternativa_escolhida == undefined) {
        res.status(400).send("Sua alternativa escolhida está undefined!");
    } else {

        respostaModel.cadastrarResposta(id_usuario, id_quiz, num_pergunta, alternativa_escolhida)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro da resposta! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    listarRespostas,
    cadastrarResposta,
}