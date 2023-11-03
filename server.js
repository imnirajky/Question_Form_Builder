const express = require('express');
const cors = require('cors');
const PORT = 5000;
const controllersCategorize = require('./controllers/categorizeControllers');
const controllersCloze = require('./controllers/clozeTestControllers');
const controllersComprehension = require('./controllers/comprehensionControllers');
const path = require('path');
require('dotenv').config();
// const __dirname1 = path.resolve();
const app = express();
const connectDB = require('./config/config');

app.use(cors());
app.use(express.json());
connectDB();

app.post('/api/save/categorize', controllersCategorize.storeCategorizeData);
app.get('/api/get/categorize', controllersCategorize.getCategorizeData);
app.post('/api/save/cloze', controllersCloze.createClozeTest);
app.get('/api/get/cloze', controllersCloze.getClozeTest);
app.post('/api/save/comprehensions', controllersComprehension.createComprehension);
app.get('/api/get/comprehensions', controllersComprehension.getAllComprehensions);

// -- -- -- -- -- -- -- -- -- -- --For Deploy-- -- --
app.use(express.static(path.join(__dirname, "./client/build")));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
    console.log(`Server Launched on PORT: ${PORT}`);
});