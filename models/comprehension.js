const mongoose = require('mongoose');

const comprehensionSchema = new mongoose.Schema({
    comprehension: String,
    mcqs: [{
        question: String,
        options: [String]
    }]
});

const comprehensionTest = mongoose.model('comprehensionTest', comprehensionSchema);

module.exports = comprehensionTest;