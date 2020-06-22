const mongoose = require('mongoose');
const mongoURI = require('./keys').mongoURI;

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(mongoURI, {
            // Prevent warnings in the console
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch(err){
        console.error(err);
        process.exit(1);
    }
}

module.exports = connectDB;