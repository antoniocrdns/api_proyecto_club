const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// Rutas para CRUD de productos
router.post('/login', authController.login);

module.exports = router;