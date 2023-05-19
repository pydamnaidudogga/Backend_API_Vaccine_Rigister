const mongoose = require('mongoose');
const mongodbUri = 'mongodb+srv://pydamnaidu:wFkEtwmASsquWhOH@Vaccine.cjh6ckr.mongodb.net/?retryWrites=true&w=majority';
// const mongodbUri = 'mongodb://127.0.0.1/vaccine';
mongoose.set('strictQuery',false);
mongoose.connect(mongodbUri, {
  useNewUrlParser: true,
 
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

module.exports = db;