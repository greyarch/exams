var passport = exports.passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

exports.ensure = function(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/login');
}

exports.rest = function(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.json(401, {error: "Authorization required."});
}

var users = [
    {id: 1, username: 'bob', password: 'secret', email: 'bob@example.com'}
    , {id: 2, username: 'joe', password: 'birthday', email: 'joe@example.com'}
    , {id: 3, username: 'a', password: 'a', email: 'joe@example.com'}
];

function findById(id, fn) {
    var idx = id - 1;
    if (users[idx]) {
        fn(null, users[idx]);
    } else {
        fn(new Error('User ' + id + ' does not exist'));
    }
}

function findByUsername(username, fn) {
    for (var i = 0, len = users.length; i < len; i++) {
        var user = users[i];
        if (user.username === username) {
            return fn(null, user);
        }
    }
    return fn(null, null);
}

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    findById(id, function(err, user) {
        done(err, user);
    });
});

passport.use(new LocalStrategy({
        usernameField: 'login',
        passwordField: 'pass'
    },
    function(username, password, done) {
        findByUsername(username, function(err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, {message: 'Unknown user ' + username});
            }
            if (user.password != password) {
                return done(null, false, {message: 'Invalid password'});
            }
            return done(null, user);
        });
    }
));
