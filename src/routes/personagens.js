var express = require("express");
var router = express.Router();

var personagemController = require("../controllers/personagemController");

router.get("/imagens", function (req, res) {
    personagemController.pegarImagens(req, res);
});

router.get("/listar", function (req, res) {
    personagemController.listar(req, res);
});

router.post("/pesquisar", function (req, res) {
    personagemController.pesquisar(req, res);
});

router.get("/buscarFavorito/:idPersonagem", function(req, res) {
    personagemController.buscarFavorito(req, res);
});

module.exports = router;