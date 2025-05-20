var express = require("express");
var router = express.Router();

var respostaController = require("../controllers/respostaController");

router.get("/listar/:idQuiz", function (req, res) {
    respostaController.listarRespostas(req, res);
})

router.post("/cadastrar", function (req, res) {
    respostaController.cadastrarResposta(req, res);
})

module.exports = router;