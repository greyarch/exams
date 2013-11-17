var questions = [
                    {id: 1, question: "Who am I?", answers: 
                        [{id:1, answer: "No idea."},
                         {id:2, answer: "Is that you Jim?"},
                         {id:3, answer: "Don't care."},
                         {id:4, answer: "Whatever..."}]},
                    {id: 2, question: "Questions nr 2", answers: 
                        [{id:1, answer: "No idea."},
                         {id:2, answer: "Is that you Jim?"},
                         {id:3, answer: "Don't care."},
                         {id:4, answer: "Whatever..."}]},
                    {id: 3, question: "Questions nr 3", answers: 
                        [{id:1, answer: "No idea."},
                         {id:2, answer: "Is that you Jim?"},
                         {id:3, answer: "Don't care."},
                         {id:4, answer: "Whatever..."}]}
                ];

module.exports = function (app, auth, db) {
    //get a question by id
    app.get('/question/:id', function (req, res) {
        res.json(200, questions[req.params.id - 1]);
    });
};