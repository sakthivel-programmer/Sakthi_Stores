const mongoose=require("mongoose");
mongoose.connect(
  'mongodb+srv://klsakthi3344:klsakthi333@cluster0.b9ziqxt.mongodb.net/',
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

// const mongoose=require("mongoose");

// mongoose.connect("mongodb://127.0.0.1/Sakthi_Stores");

// const db = mongoose.connection;

// db.on('error', console.error.bind(console, "Error connecting to MongoDB"));

// db.once('open', function(){
//     console.log('Connected to Database :: MongoDB');
// });

// module.exports = db;
