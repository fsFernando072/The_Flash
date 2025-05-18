var express = require("express");
var router = express.Router();

var quizController = require("../controllers/quizController");

router.post("/cadastrar", function (req, res) {
    quizController.cadastrar(req, res);
})

router.post("/listarUltimo", function (req, res) {
    quizController.listarUltimo(req, res);
})

router.get("/listar", function (req, res) {
    quizController.listar(req, res);
})

router.post("/perguntas", function (req, res) {
    quizController.cadastrarPergunta(req, res);
})

module.exports = router;