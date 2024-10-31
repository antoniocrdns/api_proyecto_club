const express = require('express');
const router = express.Router();
const rolesController = require('../controllers/roles.controller');

// Rutas para CRUD de ticket
router.get('/', rolesController.getAllRoles);
router.get('/:id', rolesController.getRolById);
router.post('/', rolesController.createRol);
router.delete('/:id', rolesController.deleteRol);
module.exports = router;