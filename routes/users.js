module.exports = function (app, auth, connection) {
    app.get('/login', function (req, res) {
        res.render('login.html');
    });

    app.post('/login', function (req, res, next) {
        auth.passport.authenticate('local', {successRedirect:'/',
                failureRedirect:'/login'},
            function (err, user, info) {
                if (err) {
                    return next(err)
                }
                if (!user) {
                    return res.end();
                }
                req.logIn(user, function (err) {
                    if (err) {
                        return next(err);
                    }
                    return res.redirect('/');
                });
            })(req, res, next);
    });
};

