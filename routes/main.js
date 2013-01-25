module.exports = function (app, auth, db) {
    app.get('/', auth.ensure, function (req, res) {
        res.redirect('/exams');
    });

    app.get('/logout', function(req, res){
        req.logout();
        res.redirect('/');
    });
};