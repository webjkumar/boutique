var mongoose = require("mongoose");
var passport = require("passport");
var User = require("../models/user");

var userController = {};

// Restrict access to root page
userController.home = function (req, res) {
    res.render('index', { user: req.user });
};

// Go to registration page
userController.register = function (req, res) {
    res.render('register');
};

// Post registration
userController.doRegister = function (req, res) {
    User.register(new User({ username: req.body.username, name: req.body.name }), req.body.password, function (err, user) {
        if (err) {
            return res.render('register', { user: user });
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    });
};

// Go to login page
userController.login = function (req, res) {
    res.render('login');
};

function next1(err){ console.log(err)}

// Post login
userController.doLogin = function (req, res, next) {
    passport.authenticate("local", function (err, user, info) {
        // if any problems exist, error out
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.send(500, info.message);
        }

        // log in the user
        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }
            // once login succeeded, return the user and session created 201
            //return res.send(201, user);
            res.redirect('/');
        });

        //res.redirect('/');
    })(req, res, next);
    
    //passport.authenticate('local')(req, res, function () {
      //  res.redirect('/');
    //});
};

// logout
userController.logout = function (req, res) {
    req.logout();
    res.redirect('/');
};

module.exports = userController;