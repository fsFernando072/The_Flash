var quizModel = require("../models/quizModel");

function cadastrar(req, res) {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    var senha = req.body.senha;
    var caminhoImagem = req.body.caminhoImagem;
    var id = req.body.id;

    if (titulo == undefined) {
        res.status(400).send("Seu título está undefined!");
    } else if (descricao == undefined) {
        res.status(400).send("Sua descricao está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (caminhoImagem == undefined) {
        res.status(400).send("Sua imagem está undefined!");
    } else if (id == undefined) {
        res.status(400).send("Seu id está undefined!");
    } else {

        quizModel.cadastrar(titulo, descricao, senha, caminhoImagem, id)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro do quiz! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function listarUltimo(req, res) {
    var id = req.body.id;

    quizModel.listarUltimo(id)
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
            console.log("Houve um erro ao buscar o id do quiz: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function listar(req, res) {
    quizModel.listar()
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
            console.log("Houve um erro ao buscar os quizzes: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

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

        quizModel.cadastrarPergunta(numero, pergunta, alternativaA, alternativaB, alternativaC, alternativaD, alternativaE, alternativaCorreta, id)
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

module.exports = {
    cadastrar,
    listarUltimo,
    listar,
    cadastrarPergunta
}