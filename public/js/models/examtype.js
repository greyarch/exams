define(['js/libs/knockout-2.2.0.js', 'js/ajax.js'], function (ko, ajax) {
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

    ExamType.getAllAsJson = function(onSuccess) {
        console.log("getting all exam types");
        ajax.get('/examtype', function(data){onSuccess(data)});
    }

    ExamType.getAll = function (onSuccess) {
        ExamType.getAllAsJson(function(data) {
            var et = [];
            _.map(data, function (item) {
                et.push(new ExamType(item));
            });
            onSuccess(et);
        });
    }

    return ExamType;
});