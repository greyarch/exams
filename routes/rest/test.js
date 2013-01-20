module.exports = function (app, auth, db) {
    //get all tests
    app.get('/test', auth.rest, function (req, res) {
        console.log("loading all tests");
        db.query('SELECT * FROM tests ORDER BY tag ASC', function (err, rows) {
            if (err) throw err; //TODO report error here
            console.log('Tests are: ', rows);
            res.json(200, rows);
        });
    });
};
