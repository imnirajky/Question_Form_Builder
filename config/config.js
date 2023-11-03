const mongoose = require('mongoose');
const mongodbUri = process.env.MONGODB_URI;

const connectDB = async() => {
    try {
        const connection = await mongoose.connect(mongodbUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`
                    MongoDB Server connected to Backend Server `);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}


module.exports = connectDB;