var express = require("express");
var router = express.Router();

var quizController = require("../controllers/quizController");

router.post("/cadastrar", function (req, res) {
    quizController.cadastrar(req, res);
})

router.get("/listarUltimo/:idQuiz", function (req, res) {
    quizController.listarUltimo(req, res);
})

router.get("/listar", function (req, res) {
    quizController.listar(req, res);
})

router.get("/listarSelecionado/:idQuiz", function (req, res) {
    quizController.listarSelecionado(req, res);
})

module.exports = router;