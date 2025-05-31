var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.put("/editar", function (req, res) {
    usuarioController.atualizarPerfil(req, res);
});

router.put("/favoritar", function (req, res) {
    usuarioController.favoritarPersonagem(req, res);
});

router.delete("/excluir", function (req, res) {
    usuarioController.excluir(req, res);
});

module.exports = router;