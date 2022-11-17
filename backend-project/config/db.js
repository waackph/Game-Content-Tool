const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

// ***
// Script to connect with the MongoDB with default credentials
// ***

const connectDB = async () => {
    try {
        await mongoose.connect(
            db,
            {
                useNewUrlParser: true,
                authSource: "admin",
                user: "root",
                pass: "rootpw",
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );
        console.log('MongoDB is connecting');
    } catch (err) {
        console.log(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;