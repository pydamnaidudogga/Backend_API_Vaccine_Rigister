// routes Index file



const express = require('express');
const route = express.Router();


// All the /users routes are set to the users section
route.use('/users',require('./users'));
// All the /slots routes are set to the slots section
route.use('/slots',require('./slots'));
// All the /admin routes are set to the admins section
route.use('/admin',require('./admin'));



module.exports = route;
