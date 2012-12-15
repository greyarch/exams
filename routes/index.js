module.exports = function(app, auth, connection) {
    require('./main')(app, auth, connection);
    require('./exams')(app, auth, connection);
    require('./users')(app, auth, connection);
};
