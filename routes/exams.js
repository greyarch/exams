var _ = require('lodash');

module.exports = function (app, auth, db) {
    app.get('/exams', auth.ensure, function (req, res) {
        res.render('exams.html', {user:req.user});
    });

    app.get('/reports/participants.csv', auth.ensure, function (req, res) {
        getParticipantsForReport(db, function (rows) {
            console.log("exporting all participants", rows);

            var keys = _.keys(rows[0]);
            var csv = keys.join(",");
            _(rows).each(function (row) {
                var values = _.values(row);
                csv += "\n";
                csv += _(values).map(function (v) {
                    return sanitize(v);
                }).join(",");
            });
            res.type("text/csv").send(200, csv);
        });
    });

    app.get('/reports', auth.ensure, function (req, res) {
        getParticipantsForReport(db, function (rows) {
            console.log("showing all participants", rows);
            res.render('reports.html', {user:req.user, participants:rows});
        });
    });

    app.get('/examtypes', auth.ensure, function (req, res) {
        res.render('examtypes.html', {user:req.user});
    });
};

function sanitize(item) {
    return '"' + (typeof item === "string" ? item.replace('"', '""') : item) + '"';
}

function getParticipantsForReport(db, onSuccess) {
    db.query('SELECT p.company, p.first_name, p.last_name, p.email, p.price, p.fee, p.result, p.pass, et.tag ' +
            'FROM participants p JOIN exams e ON p.exam_id = e.id JOIN exam_types et ' +
            'ON e.exam_type_id = et.id ORDER BY first_name ASC;',
        function (err, rows) {
            if (err) throw err; //TODO report error here
            onSuccess(rows);
        });
}