const express = require('express');
const router = express.Router();

const OngController = require('../controllers/OngController');
const CasosController = require('../controllers/CasosController');
const PerfilController = require('../controllers/PerfilController');
const SessionController = require('../controllers/SessionController');

router.post('/login', SessionController.login);

router.get('/ongs', OngController.index);
router.post('/ongs', OngController.criarOng);

router.get('/perfil', PerfilController.index);

router.get('/casos', CasosController.index);
router.post('/casos', CasosController.criarCaso);
router.delete('/casos/:id', CasosController.deletarCaso);

module.exports = router;