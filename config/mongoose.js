// const mongoose=require("mongoose");

// mongoose.connect("mongodb://127.0.0.1/Sakthi_Stores");

// const db = mongoose.connection;

// db.on('error', console.error.bind(console, "Error connecting to MongoDB"));

// db.once('open', function(){
//     console.log('Connected to Database :: MongoDB');
// });

// module.exports = db;

const mongoose = require('mongoose');
//fill your database name here

mongoose.connect(
  'mongodb+srv://klsakthi333:Mongoose@cluster0.@Sakthi333.mongodb.net/review_managment_system_db?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;

db.on('error', console.error.bind('console', 'error'));

db.once('open', function () {
  console.log('welcome connect to database');
});

module.exports = db;
