define('models/examtype', ['js/libs/knockout-2.2.0.js', 'js/ajax.js'], function (ko, ajax) {
    function ExamType(json) {
        var self = this;
        self.id = ko.observable(json.id);
        self.title = ko.observable(json.title);
        self.tag = ko.observable(json.tag);

        self.toJSON = function () {
            return {
                id:self.id(),
                title:self.title(),
                tag:self.tag()
            }
        }

        self.delete = function (onSuccess) {
            console.log("deleting Exam Type with id: ", self.id());
            ajax.del('/examtype/id/' + self.id(), onSuccess);
        }
    }

    ExamType.getAll = function (onSuccess) {
        console.log("getting all exam types");
        ajax.get('/examtype', onSuccess);
    }

    return ExamType;
});