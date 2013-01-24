module.exports = function(app, auth, db) {
    require('./main')(app, auth, db);
    require('./exams')(app, auth, db);
    require('./reports')(app, auth, db);
    require('./users')(app, auth, db);
    require('./rest/exam')(app, auth, db);
    require('./rest/examtype')(app, auth, db);
    require('./rest/participant')(app, auth, db);
    require('./rest/test')(app, auth, db);
};