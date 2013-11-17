var context = require('./context');

module.exports = function(app, auth, db) {
    app.get('/online_exam', function(req, res) {
        console.log("menu is", context.exams.menu);
        res.render('online_exam.html', {
            user: req.user,
            menu: context.exams.online_exam,
            current: "online_exam"
        });
    });

    app.get('/quiz/:exam/:cmuid', function(req, res) {
        console.log("menu is", context.exams.menu);
        console.log("exam is", req.params.exam);
        console.log("cmuid is", req.params.cmuid);
        res.render('quiz.html', {
            user: req.user,
            menu: context.exams.online_exam,
            current: "online_exam",
            exam: req.params.exam,
            cmuid: req.params.cmuid
        });
    });
};
