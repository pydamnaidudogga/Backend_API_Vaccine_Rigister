// admin routes

const express = require('express');
const route = express.Router();
const adminController = require('../controllers/adminController');

// This route is used to login the Admin
route.post('/login',adminController.logIn);
// This route is used to get the All the users list who is rigisterd
route.get('/rigisterd_users_list',adminController.getAllRigisterdUsers);
// This route is used  to get the users  list for a particular slot
route.post('/slot_users_list',adminController.getSlotUsersList);




module.exports = route;