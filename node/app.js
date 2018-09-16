'use strict';
const logger = require('./helpers/logger');
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const config = require('./config');
const app = express();
const cors = require('cors');
const votingService = require('./services/voting.service');

app.options('*', cors({maxAge: 600}));
app.use(cors({maxAge: 600}));

app.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({
    extended: false
}));


app.use(errorHandler);

// routes
app.use('/api', require('./routes/api'));


/* START SERVER CODE */
const host = config.host;
const port = config.port;
const server = http.createServer(app).listen(port, function () {
});
logger.info('****************** SERVER STARTED ************************');
logger.info('**************  http://' + host + ':' + port + '  ******************');

server.setTimeout(60000);

function errorHandler(err, req, res, next) {
    if (err instanceof URIError && err.code === 403) {
        res.status(403).send({Error: 'Access denied'})
    } else {
        res.status(500).send({Error: err})
    }
}

votingService.setup();

// x
