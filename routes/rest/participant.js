module.exports = function (app, auth, db) {
    //update a participant
    app.put('/participant/id/:id', auth.rest, function (req, res) {
        var participant = req.body;
        console.log("updating participant", participant);
        db.safeQuery('UPDATE participants SET ? WHERE id = ?', [participant, req.params.id], res, function (rows) {
            console.log('participants are: ', rows);
            res.json(200, rows);
        });
    });

    //delete a participant with an id
    app.delete('/participant/id/:id', auth.rest, function (req, res) {
        console.log("deleting a participant with id " + req.params.id);
        db.safeQuery('DELETE FROM participants WHERE id = ?', [req.params.id], res, function (result) {
            console.log('result is: ', result);
            res.end();
        });
    });
};
