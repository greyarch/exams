module.exports = function (app, auth, db) {
    //create exam
    app.post('/exam', auth.rest, function (req, res) {
        var exam = req.body;
        console.log("creating an exam: ");
        console.dir(exam);
        db.query('INSERT INTO exams SET ?', exam, function (err, result) {
            if (err) throw err; //TODO report error here
            console.log('result is: ', result);
            res.json(201, exam);
        });
    });

    //create participant for exam
    app.post('/exam/id/:id/participant', auth.rest, function (req, res) {
        var part = req.body;
        part.exam_id = req.params.id;
        console.log("creating a participant for exam with id ", req.params.id);
        console.dir(part);
        db.query('INSERT INTO participants SET ?', part, function (err, result) {
            if (err) throw err; //TODO report error here
            console.log('result is: ', result);
            res.json(201, part);
        });
    });

    //get all exams
    app.get('/exam', auth.rest, function (req, res) {
        console.log("loading all exams");
        db.query('SELECT * FROM exams ORDER BY date DESC', function (err, rows) {
            if (err) throw err; //TODO report error here
            console.log('exams are: ', rows);
            res.json(200, rows);
        });
    });

    //update an exam
    app.put('/exam/id/:id', auth.rest, function (req, res) {
        var exam = req.body;
        console.log("updating exam", exam);
        db.query('UPDATE exams SET ? WHERE id = ?', [exam, req.params.id], function (err, rows) {
            if (err) throw err; //TODO report error here
            console.log('exams are: ', rows);
            res.json(200, rows);
        });
    });

    //get all participants in an exam
    app.get('/exam/id/:id/participant', auth.rest, function (req, res) {
        console.log("loading all participants in exam with id ", req.params.id);
        db.query('SELECT * FROM participants WHERE exam_id = ?', [req.params.id], function (err, rows) {
            if (err) throw err; //TODO report error here
            console.log('participants are: ', rows);
            res.json(200, rows);
        });
    });

    //delete exam with an id
    app.delete('/exam/id/:id', auth.rest, function (req, res) {
        console.log("deleting an exam (and all its participants) with id " + req.params.id);
        db.query('DELETE FROM exams WHERE id = ?', [req.params.id], function (err, result) {
            if (err) throw err; //TODO report error here
            console.log('result from exam deletion is: ', result);
            db.query('DELETE FROM participants WHERE exam_id = ?', [req.params.id], function (err, result) {
                if (err) throw err; //TODO report error here
                console.log('result deleting all participants is: ', result);
                res.end();
            });
        });
    });
};
