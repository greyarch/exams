module.exports = function (app, auth, connection) {
    app.get('/', auth.ensure, function (req, res) {
        res.redirect('/exams');
    });
};