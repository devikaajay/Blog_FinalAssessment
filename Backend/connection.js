// const mongoose = require("mongoose");
// mongoose
//   .connect("mongodb+srv://DevikaG:Devika@cluster0.emuhexx.mongodb.net/Blog?retryWrites=true&w=majority&appName=Cluster0")
//   .then(() => {
//     console.log("Connected to DB");
//   })
//   .catch((error) => {
//     console.log(error);
//   });
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://DevikaG:Devika@cluster0.emuhexx.mongodb.net/Blog?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB Atlas');
  } catch (error) {
    console.error('Failed to connect to MongoDB Atlas', error);
    process.exit(1); // Exit the process if connection fails
  }
};

module.exports = connectDB;
