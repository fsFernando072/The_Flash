var express = require("express");
var router = express.Router();

var personagemController = require("../controllers/personagemController");

router.get("/imagens", function (req, res) {
    personagemController.pegarImagens(req, res);
});

module.exports = router;