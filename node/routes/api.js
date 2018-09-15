const express = require('express');
const router = express.Router();
const logger = require('../helpers/logger');

router.get('/vote', function (req, res) {

    console.log("/api/auth");

    res.send("ok");

});


module.exports = router;