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
    })(req, res, next);
};

// logout
userController.logout = function (req, res) {
    req.logout();
    res.redirect('/');
};


// Create and Save a new Note
userController.create = (req, res) => {
    // Validate request
    if (!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    // Create a Note
    const user = new User({
        name : req.body.name,
        password: req.body.password,
        username : req.body.username
    });

    // Save Note in the database
    user.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });
};

// Retrieve and return all notes from the database.
userController.findAll = (req, res) => {

};

// Find a single note with a noteId
userController.findOne = (req, res) => {

};

// Update a note identified by the noteId in the request
userController.update = (req, res) => {

};

// Delete a note with the specified noteId in the request
userController.delete = (req, res) => {

};

module.exports = userController;