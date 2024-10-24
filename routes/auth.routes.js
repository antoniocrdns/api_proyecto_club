const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// Rutas para CRUD de productos
router.post('/:id', authController.login);
router.post('/:id', authController.logout);


module.exports = router;