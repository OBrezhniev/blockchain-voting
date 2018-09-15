const express = require('express');
const router = express.Router();
const logger = require('../helpers/logger');
const votingService = require('../services/voting.service');

router.post('/vote', async function (req, res) {

    console.log("/api/vote");

    let result = await votingService.vote(req.params.address, req.params.ballot);
    console.log(result);

    res.json(result);

});

router.post('/addToWhiteList', async function (req, res) {

    console.log("/api/addToWhiteList");

    let result = await votingService.addToWhiteList(req.params.address);
    console.log(result);

    res.json(result);

});

router.get('/getVote', async function (req, res) {

    console.log("/api/getVote");

    let result = await votingService.getVote(req.query.address);
    console.log(result);

    res.json(result);

});

router.get('/getAddressCount', async function (req, res) {

    console.log("/api/getAddressCount");

    let result = await votingService.getAddressCount();
    console.log(result);

    res.json(result);

});

router.get('/getUniqueAddressByIndex', async function (req, res) {

    console.log("/api/getUniqueAddressByIndex");

    let result = await votingService.getUniqueAddressByIndex(req.query.index);
    console.log(result);

    res.json(result);

});


module.exports = router;