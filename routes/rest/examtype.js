module.exports = function (app, auth, db) {
     //create exam type
    app.post('/examtype', auth.rest, function (req, res) {
        var examtype = req.body;
        console.log("creating an exam type: ");
        console.dir(examtype);
        db.query('INSERT INTO exam_types SET ?', examtype, function (err, result) {
            if (err) throw err; //TODO report error here
            console.log('result is: ', result);
            res.json(201, examtype);
        });
    });

    //get all exam types
    app.get('/examtype', auth.rest, function (req, res) {
        console.log("loading all exam types");
        db.query('SELECT * FROM exam_types ORDER BY tag ASC', function (err, rows) {
            if (err) throw err; //TODO report error here
            console.log('Exam Types are: ', rows);
            res.json(200, rows);
        });
    });

    //delete an Exam Type with an id
    app.delete('/examtype/id/:id', auth.rest, function (req, res) {
        console.log("deleting an Exam type with id " + req.params.id);
        db.query('DELETE FROM exam_types WHERE id = ?', [req.params.id], function (err, result) {
            if (err) throw err; //TODO report error here
            console.log('result is: ', result);
            res.end();
        });
    });
};
