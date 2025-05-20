var express = require("express");
var router = express.Router();

var perguntaController = require("../controllers/perguntaController");

router.post("/cadastrar", function (req, res) {
    perguntaController.cadastrarPergunta(req, res);
})

router.get("/listar/:idQuiz", function (req, res) {
    perguntaController.listarPerguntas(req, res);
})

module.exports = router;