var Chats = require("../models/chats");
var chatController = {};
chatController.home = function (req, res) {
    Chats.find({}, (error, chats) => {
        res.render('chats', { 'chats': chats });        
    });
};
module.exports = chatController;