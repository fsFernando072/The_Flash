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
    var id = req.params.idQuiz;

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

function listarSelecionado(req, res) {
    var id = req.params.idQuiz;

    quizModel.listarSelecionado(id)
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

module.exports = {
    cadastrar,
    listarUltimo,
    listar,
    listarSelecionado
}