const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // We use process.env to access the variables in our .env file
    const connect = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${connect.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    // Exit the process with a failure code if the connection fails
    process.exit(1);
  }
};

module.exports = connectDB;
