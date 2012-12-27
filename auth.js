//module.exports = function (db, passport) {
var passport = exports.passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

exports.ensure = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

exports.rest = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.json(401, {error:"Authorization required."});
}

function findById(id, fn) {
    db.query('SELECT * FROM users WHERE id = ?', [id], function (err, result) {
        if (err) return fn(err, null)
        if (result.length != 0) return fn(null, result[0]);
        return fn(null, null);
    });
}

function findByUsername(username, fn) {
    db.query('SELECT * FROM users WHERE username = ?', [username], function (err, result) {
        if (err) return fn(err, null);
        if (result.length != 0) return fn(null, result[0]);
        return fn(null, null);
    });
}

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use(new LocalStrategy({
        usernameField:'login',
        passwordField:'pass'
    },
    function (username, password, done) {
        findByUsername(username, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, {message:'Unknown user ' + username});
            }
            if (user.password != password) {
                return done(null, false, {message:'Invalid password'});
            }
            return done(null, user);
        });
    }
));
//};