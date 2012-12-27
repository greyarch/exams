module.exports = function (app, auth, db) {
    var calendar = require('calendar');
    var c = new calendar.Calendar(1); //week starts on Monday

    app.get('/calendar', auth.ensure, function (req, res) {
        var today = new Date();
        var year = 1900 + today.getYear();
        var month = today.getMonth();
        res.render('calendar.html', {user: req.user, dates:{year: year, month: month, monthDays: c.monthDays(year, month)}});
    });
};