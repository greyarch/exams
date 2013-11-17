module.exports = function(app, auth, db, io) {
    require('./main')(app, auth, db);
    require('./exams')(app, auth, db);
    require('./reports')(app, auth, db);
    require('./users')(app, auth, db);
    require('./online-exam')(app, auth, db);
    require('./rest/exam')(app, auth, db, io);
    require('./rest/examtype')(app, auth, db);
    require('./rest/participant')(app, auth, db);
    require('./rest/test')(app, auth, db);
    require('./rest/question')(app, auth, db);
}