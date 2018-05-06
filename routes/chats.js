var express = require('express');
var router = express.Router();
var chatCtrl = require("../controllers/chatController.js");
var Chats = require("../models/chats");

router.get('/', chatCtrl.home);
router.get('/list', async function(req, res) {
    Chats.find({}, (error, chats) => {
        res.send(chats)
    });
});
router.post('/', async function (req, res) {
    console.log("req.body", req.body);
    try {
        var chat = new Chats(req.body)
        await chat.save()
        res.status(200)
        //Emit the event
        var io = req.app.get('socketio');
        io.emit("chat", req.body);
    } catch (error) {
        res.status(500)
        console.error(error)
    }
});

module.exports = router;