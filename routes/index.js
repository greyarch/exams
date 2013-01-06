module.exports = function(app, auth, db) {
    require('./main')(app, auth, db);
    require('./exams')(app, auth, db);
    require('./users')(app, auth, db);
    require('./calendar')(app, auth, db);
};