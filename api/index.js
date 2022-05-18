const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');

const config = require('../config.js');
const user = require('./components/user/network');
const auth = require('./components/auth/network');
const swaggerDocument = require('./swagger.json');
const errors = require('../network/error');

const app = express();

// nos permite trabajar con la data en json
app.use(bodyParser.json());

// router
app.use('/api/user', user);
app.use('/api/auth', auth);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(errors);

app.listen(config.api.port, () => {
    console.log(`Server is running on port ${config.api.port}`);
});