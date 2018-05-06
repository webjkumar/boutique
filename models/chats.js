var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ChatSchema = new Schema({
    name: String,
    chat: String
});


module.exports = mongoose.model('Chats', ChatSchema);