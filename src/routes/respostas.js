var express = require("express");
var router = express.Router();

var respostaController = require("../controllers/respostaController");

router.get("/listar/:idQuiz", function (req, res) {
    respostaController.listarRespostas(req, res);
})

router.post("/cadastrar", function (req, res) {
    respostaController.cadastrarResposta(req, res);
})

router.get("/listarRanking", function (req, res) {
    respostaController.listarRanking(req, res);
})

router.get("/listarPorQuiz/:idUsu", function (req, res) {
    respostaController.listarPorQuiz(req, res);
})

router.get("/listarMeusQuizzes/:idUsu", function (req, res) {
    respostaController.listarMeusQuizzes(req, res);
})

module.exports = router;