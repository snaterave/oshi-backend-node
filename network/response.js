const express = require('express');
const config = require('../config.js');
const app = express();

// router

app.listen(config.api.port, () => {
    console.log(`Server is running on port ${config.api.port}`);
});