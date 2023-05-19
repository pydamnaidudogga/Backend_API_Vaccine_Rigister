const express = require('express');
const route = express.Router();
const userControllers = require('../controllers/usersController');

// User sign_UP route
route.post('/signup',userControllers.signUP);
// User sing_IN route
route.post('/signin',userControllers.logIn);
// This Route is used to book the slot for the vaccine
route.post('/:userId/slots/:dose',userControllers.slotBook);
// This Route is used to update the slot
route.put('/:userId/slots/:dose',userControllers.slotUpdate);




module.exports = route;
