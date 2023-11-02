const mongoose = require('mongoose');

const categoryItemsSchema = new mongoose.Schema({
    description: String,
    Categorize: {
        type: Object,
        required: true,
    },
});

const Categorize = mongoose.model('Categorize', categoryItemsSchema);

module.exports = Categorize;