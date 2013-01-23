var examsmodule = require('./context/exams');

module.exports = function (app, auth, db) {
    var moment = require('moment');
    var calendar = require('calendar');
    var c = new calendar.Calendar(1); //week starts on Monday

    app.get('/calendar', auth.ensure, function (req, res) {
        var today = new Date();
        var year = req.query.year ? parseInt(req.query.year) : 1900 + today.getYear();
        var month = req.query.month ? parseInt(req.query.month) : today.getMonth();

        var current = moment(new Date(year, month, 1));
        var prev = moment(new Date(year, month, 1)).subtract("M", 1);
        var next = moment(new Date(year, month, 1)).add("M", 1);
        var monthDays = c.monthDays(year, month);

        var ym = year + '-' + (month + 1); //months start at 0 in JS Date
        var start = ym + '-1';
        var end = ym + '-31';
        db.query('SELECT * FROM exams WHERE date BETWEEN "' + start + '" AND "' + end + '" ORDER BY date ASC', function (err, rows) {
            if (err) throw err; //TODO report error here
            console.log("rows are ", rows);
            var calendar = {weeks:[],
                current:{year: year, month: current.format("MMMM")},
                prev:{year:prev.year(), month:prev.month()},
                next:{year:next.year(), month:next.month()}};
            for (var i in monthDays) {
                var week = {dates:[]};
                for (var j in monthDays[i]) {
                    var date = {date:monthDays[i][j], events:[]};
                    while (rows[0] && (rows[0].date.getDate() === monthDays[i][j])) {
                        date.events.push(rows.shift());
                    }
                    week.dates.push(date);
                }
                calendar.weeks.push(week);
            }
            res.render('calendar.html', {user:req.user, calendar:calendar, menu:examsmodule.context.menu, link:"calendar"});
        });
    });
};