var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new Schema({
    username: String,
    password: String,
    name: String
});
UserSchema.methods.verifyPassword = function(password){
    return (password)? true : false;
}
/*
UserSchema.methods.authenticate = function(username, password, done){
    this.findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.verifyPassword(password)) { 
            return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
    });
}
*/
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);