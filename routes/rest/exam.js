module.exports = function (app, auth, db) {
    //create exam
    app.post('/exam', auth.rest, function (req, res) {
        var exam = req.body;
        console.log("creating an exam: ");
        console.dir(exam);
        db.safeQuery('INSERT INTO exams SET ?', exam, res, function (result) {
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
        db.safeQuery('INSERT INTO participants SET ?', part, res, function (result) {
            console.log('result is: ', result);
            res.json(201, part);
        });
    });

    //get all exams
    app.get('/exam', auth.rest, function (req, res) {
        console.log("loading all exams");
        db.safeQuery('SELECT * FROM exams ORDER BY date DESC', null, res, function (rows) {
            console.log('exams are: ', rows);
            res.json(200, rows);
        });
    });

    //update an exam
    app.put('/exam/id/:id', auth.rest, function (req, res) {
        var exam = req.body;
        console.log("updating exam", exam);
        db.safeQuery('UPDATE exams SET ? WHERE id = ?', [exam, req.params.id], res, function (rows) {
            console.log('exams are: ', rows);
            res.json(200, rows);
        });
    });

    //get all participants in an exam
    app.get('/exam/id/:id/participant', auth.rest, function (req, res) {
        console.log("loading all participants in exam with id ", req.params.id);
        db.safeQuery('SELECT * FROM participants WHERE exam_id = ?', [req.params.id], res, function (rows) {
            console.log('participants are: ', rows);
            res.json(200, rows);
        });
    });

    //delete exam with an id
    app.delete('/exam/id/:id', auth.rest, function (req, res) {
        console.log("deleting an exam (and all its participants) with id " + req.params.id);
        db.safeQuery('DELETE FROM exams WHERE id = ?', [req.params.id], res, function (result) {
            console.log('result from exam deletion is: ', result);
            db.safeQuery('DELETE FROM participants WHERE exam_id = ?', [req.params.id], res, function (result) {
                console.log('result deleting all participants is: ', result);
                res.end();
            });
        });
    });
};
