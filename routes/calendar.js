module.exports = function (app, auth, db) {
    var calendar = require('calendar');
    var c = new calendar.Calendar(1); //week starts on Monday

    app.get('/calendar', function (req, res) {
        var today = new Date();
        var year = 1900 + today.getYear();
        var month = today.getMonth();
        var ym = year + '-' + (month + 1);
        var start = ym + '-1';
        var end = ym + '-31';
        var monthDays = c.monthDays(year, month);
        db.query('SELECT * FROM exams WHERE date BETWEEN "' + start + '" AND "' + end + '" ORDER BY date ASC', function (err, rows) {
            if (err) throw err; //TODO report error here
            console.log("rows are ", rows);
            var calendar = [];
            for (var i in monthDays) {
                var week = [];
                for (var j in monthDays[i]) {
                    var date = {date:monthDays[i][j], events:[]};
                    while (rows[0] && (rows[0].date.getDate() === monthDays[i][j])) {
                        date.events.push(rows.shift());
                    }
                    week.push(date);
                }
                calendar.push(week);
            }
            res.render('calendar.html', {user:req.user, calendar:calendar});
        });
    });
};