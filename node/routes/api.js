const express = require('express');
const router = express.Router();
const logger = require('../helpers/logger');
const votingService = require('../services/voting.service');

router.post('/vote', async function (req, res) {

    console.log("/api/vote");

    let result = await votingService.vote(req.params.address, req.params.ballot);
    console.log(result);

    res.send("ok");

});


module.exports = router;