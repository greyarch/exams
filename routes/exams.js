module.exports = function (app, auth, connection) {
    app.get('/calendar', auth.ensure, function (req, res) {
        res.render('calendar.html');
    });

    app.get('/exams', auth.ensure, function (req, res) {
        res.render('exams.html');
    });

    //create exam
    app.post('/exam', auth.rest, function (req, res) {
        var exam = req.body;
        console.log("creating an exam: ");
        console.dir(exam);
        connection.query('INSERT INTO exams SET ?', exam, function (err, result) {
            if (err) throw err; //TODO report error here
            console.log('result is: ', result);
            res.json(201, exam);
        });
    });

    //create participant for exam
    app.post('/exam/:id/participant', auth.rest, function (req, res) {
        var part = req.body;
        part.exam_id = req.params.id;
        console.log("creating a participant for exam with id ", req.params.id);
        console.dir(part);
        connection.query('INSERT INTO participants SET ?', part, function (err, result) {
            if (err) throw err; //TODO report error here
            console.log('result is: ', result);
            res.json(201, part);
        });
    });

    //get all exam
    app.get('/exam', auth.rest, function (req, res) {
        console.log("loading all exam");
        connection.query('SELECT * FROM exams', function (err, rows) {
            if (err) throw err; //TODO report error here
            console.log('exam are: ', rows);
            res.json(200, rows);
        });
    });

    //get all participants in an exam
    app.get('/exam/:id/participant', auth.rest, function (req, res) {
        console.log("loading all participants in exam with id ", req.params.id);
        connection.query('SELECT * FROM participants WHERE exam_id = ?', [req.params.id], function (err, rows) {
            if (err) throw err; //TODO report error here
            console.log('participants are: ', rows);
            res.json(200, rows);
        });
    });

    //delete exam with an id
    app.delete('/exam/:id', auth.rest, function (req, res) {
        console.log("deleting an exam with id " + req.params.id);
        connection.query('DELETE FROM exams WHERE id = ?', [req.params.id], function (err, result) {
            if (err) throw err; //TODO report error here
            console.log('result is: ', result);
            res.end();
        });
    });

    //delete a participant with an id
    app.delete('/participant/:id', auth.rest, function (req, res) {
        console.log("deleting a participant with id " + req.params.id);
        connection.query('DELETE FROM participants WHERE id = ?', [req.params.id], function (err, result) {
            if (err) throw err; //TODO report error here
            console.log('result is: ', result);
            res.end();
        });
    });
};
