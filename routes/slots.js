const express = require('express');
const route = express.Router();
const slotsController = require('../controllers/slotsController');

// This Route is used to check the availability of the slots for the perticular date
route.post('/availability',slotsController.slotAvailability);




module.exports = route;
