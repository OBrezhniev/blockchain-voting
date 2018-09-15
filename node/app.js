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

function errorHandler(err, req, res, next) {
    if (err instanceof URIError && err.code === 403) {
        res.status(403).send({Error: 'Access denied'})
    } else {
        res.status(500).send({Error: err})
    }
}

votingService.setup();

async function test() {
    let res;

    res = await votingService.addToWhiteList("0xBFc083B26B72e6d7396071a222369B9442C33FCC");
    console.log("addToWhiteList:", res);

    //await vote("0xBFc083B26B72e6d7396071a222369B9442C33FCC", "567");

    res = await votingService.getVote("0x600e068049E7Ee86006F45b6eDd7FDf9A086D6CB");
    console.log("0x600e068049E7Ee86006F45b6eDd7FDf9A086D6CB: " + res);

    res = await votingService.getVote("0xBFc083B26B72e6d7396071a222369B9442C33FCC");
    console.log("0xBFc083B26B72e6d7396071a222369B9442C33FCC: " + res);

    res = await votingService.getAddressCount();
    console.log("getAddressCount: " + res);

    res = await votingService.getUniqueAddressByIndex(1);
    console.log("getUniqueAddressByIndex(1): " + res);

}

test();
