module.exports = function (app, auth, db) {
    //get all tests
    app.get('/test', auth.rest, function (req, res) {
        console.log("loading all tests");
        db.safeQuery('SELECT * FROM tests ORDER BY tag ASC', null, res, function (rows) {
            console.log('Tests are: ', rows);
            res.json(200, rows);
        });
    });
};
