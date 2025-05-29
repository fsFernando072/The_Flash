var personagemModel = require("../models/personagemModel");

function pegarImagens(req, res) {
    personagemModel.pegarImagens()
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
            console.log("Houve um erro ao buscar as imagens: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function listar(req, res) {
    personagemModel.listar()
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
            console.log("Houve um erro ao buscar os personagens: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function pesquisar(req, res) {
    var pesquisa = req.body.pesquisa;

    personagemModel.pesquisar(pesquisa)
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
            console.log("Houve um erro ao pesquisar o personagem: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
} 

function buscarFavorito(req, res) {
    let idPersonagem = req.params.idPersonagem;

    personagemModel.buscarFavorito(idPersonagem)
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
            console.log("Houve um erro ao buscar o personagem favorito: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    pegarImagens,
    listar,
    pesquisar,
    buscarFavorito
}