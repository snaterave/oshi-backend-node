const express = require('express');
const response = require('../../../network/response');
const router = express.Router();

router.get('/', (req, res) => {
    //res.send('Hello World!');
    response.success(req, res, 'Hello World!',200);
});

module.exports = router;