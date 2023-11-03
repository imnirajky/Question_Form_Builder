const mongoose = require('mongoose');

const clozeSchema = new mongoose.Schema({
    sentence: String,
    options: []
});

const clozeTest = mongoose.model('clozeTest', clozeSchema);

module.exports = clozeTest;