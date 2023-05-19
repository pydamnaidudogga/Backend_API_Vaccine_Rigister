const express = require('express');
const db = require('./config/mongoose');
const app = express();
const port = 8080; // Choose a suitable port

// urlencodede is used to create body object to the reqest url
app.use(express.urlencoded({extended:true}));
// All the routes are redirect to the routes folder section
app.use('/',require('./routes/index'));



// This API is listen on port no 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});