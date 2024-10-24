const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuarios.controller');

// Rutas para CRUD de productos
router.get('/', usuariosController.getAllusuarios);
router.get('/:id', usuariosController.getUsuariobyId);
router.post('/', usuariosController.createUsuario);
router.put('/:id', usuariosController.updateUsuario);
router.delete('/:id', usuariosController.deleteUsuario);

module.exports = router;