const mongoose = require('mongoose');
const connectDB = async() => {
    try {
        const connection = await mongoose.connect(`mongodb://localhost:27017/formBuilder`, {
            useNewUrlParser: true
        });
        console.log(`MongoDB Server connected to Backend Server`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}


module.exports = connectDB;