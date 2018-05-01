var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {

    // This isn't part of API and is just used from a browser or curl to test that
    // "/pop" is being routed correctly.

    var testObject = {
        "AppName": "MongoPop",
        "Version": 1.0
    }
    res.json(testObject);
});

router.get('/ip', function (req, res, next) {

    // Sends a response with the IP address of the server running this service.

    res.json({ "ip": publicIP });
});

module.exports = router;