const express = require('express');
const router = express.Router();
const rolesController = require('../controllers/roles.controller');

// Rutas para CRUD de ticket
router.get('/', rolesController.getAllRoles);

module.exports = router;