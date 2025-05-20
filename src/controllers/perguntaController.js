var perguntaModel = require("../models/perguntaModel");

function cadastrarPergunta(req, res) {
    var numero = req.body.numero;
    var pergunta = req.body.pergunta;
    var alternativaA = req.body.alternativaA;
    var alternativaB = req.body.alternativaB;
    var alternativaC = req.body.alternativaC;
    var alternativaD = req.body.alternativaD;
    var alternativaE = req.body.alternativaE;
    var alternativaCorreta = req.body.alternativaCorreta;
    var id = req.body.id;

    if (numero == undefined) {
        res.status(400).send("Seu número está undefined!");
    } else if (pergunta == undefined) {
        res.status(400).send("Sua pergunta está undefined!");
    } else if (alternativaA == undefined) {
        res.status(400).send("Sua alternativa A está undefined!");
    } else if (alternativaB == undefined) {
        res.status(400).send("Sua alternativa B está undefined!");
    } else if (alternativaC == undefined) {
        res.status(400).send("Sua alternativa C está undefined!");
    } else if (alternativaD == undefined) {
        res.status(400).send("Sua alternativa D está undefined!");
    } else if (alternativaE == undefined) {
        res.status(400).send("Sua alternativa E está undefined!");
    } else if (alternativaCorreta == undefined) {
        res.status(400).send("Sua alternativa correta está undefined!");
    } else if (id == undefined) {
        res.status(400).send("Seu id está undefined!");
    } else {

        perguntaModel.cadastrarPergunta(numero, pergunta, alternativaA, alternativaB, alternativaC, alternativaD, alternativaE, alternativaCorreta, id)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro da pergunta! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function listarPerguntas(req, res) {
    var id = req.params.idQuiz;

    perguntaModel.listarPerguntas(id)
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
            console.log("Houve um erro ao buscar as perguntas do quiz: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    cadastrarPergunta,
    listarPerguntas,
}