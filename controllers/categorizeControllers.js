const Categorize = require('../models/categorizeModel');


const storeCategorizeData = async(req, res) => {
    try {
        const newCategorizeDocument = new Categorize(req.body);

        await newCategorizeDocument.save();

        return res.status(200).json({ message: 'Categorize Data stored successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'Error occurred while saving the data' });
    }
};

const getCategorizeData = async(req, res) => {
    try {
        const data = await Categorize.find();
        return res.status(200).json({ data });
    } catch (error) {
        return res.status(500).json({ error: 'Error occurred while fetching the data' });
    }
}


module.exports = {
    storeCategorizeData,
    getCategorizeData
};