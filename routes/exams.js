module.exports = function (app, auth, db) {
    app.get('/exams', auth.ensure, function (req, res) {
        //TODO use req.query.selectedExam to get the selected exam
        res.render('exams.html', {user: req.user});
    });

    app.get('/examtypes', auth.ensure, function (req, res) {
		res.render('examtypes.html', {user: req.user});
	});

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

    //get all exam
    app.get('/exam', auth.rest, function (req, res) {
        console.log("loading all exams");
        db.query('SELECT * FROM exams ORDER BY date DESC', function (err, rows) {
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

    //get all exam types
    app.get('/examtype', auth.rest, function (req, res) {
        console.log("loading all exam types");
        db.query('SELECT * FROM exam_types ORDER BY title ASC', function (err, rows) {
            if (err) throw err; //TODO report error here
            console.log('Exam Types are: ', rows);
            res.json(200, rows);
        });
    });

    //get all tests
    app.get('/test', auth.rest, function (req, res) {
        console.log("loading all tests");
        db.query('SELECT * FROM tests ORDER BY title ASC', function (err, rows) {
            if (err) throw err; //TODO report error here
            console.log('Tests are: ', rows);
            res.json(200, rows);
        });
    });

    //delete exam with an id
    app.delete('/exam/id/:id', auth.rest, function (req, res) {
        console.log("deleting an exam with id " + req.params.id);
        db.query('DELETE FROM exams WHERE id = ?', [req.params.id], function (err, result) {
            if (err) throw err; //TODO report error here
            console.log('result is: ', result);
            res.end();
        });
    });

    //delete a participant with an id
    app.delete('/participant/id/:id', auth.rest, function (req, res) {
        console.log("deleting a participant with id " + req.params.id);
        db.query('DELETE FROM participants WHERE id = ?', [req.params.id], function (err, result) {
            if (err) throw err; //TODO report error here
            console.log('result is: ', result);
            res.end();
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
