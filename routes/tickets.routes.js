const express = require('express');
const router = express.Router();
const ticketsController = require('../controllers/tickets.controller');

// Rutas para CRUD de ticket
router.get('/', ticketsController.getAllTickets);
router.get('/:id', ticketsController.getTicketById);
router.post('/', ticketsController.createTicket);
router.delete('/:id', ticketsController.deleteTicket);

module.exports = router;