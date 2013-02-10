require(['js/libs/knockout-2.2.0.js', 'js/libs/lodash.min.js', '/js/models/examtype.js', '../admin/user-menu'], function (ko, _, ExamType, UserMenuVM) {
    function ExamTypesVM() {
        var self = this;

        self.examtypes = ko.observableArray([]);

        self.loadExamTypes = function () {
            ExamType.getAll(function (data) {
                self.examtypes(data);
            });
        };

        newExamType = function (title, tag) {
            console.log("adding an exam type");
            var et = {title:title, tag:tag};
            $.post("/examtype", et, function () {
                console.log("created the exam type");
                self.loadExamTypes();
            });

        };

        deleteExamType = function (examType) {
            confirm('Are you sure you want to delete this exam type?', function () {
                examType.remove(function () {
                    self.loadExamTypes();
                });
            });
        };

        self.loadExamTypes();
    }

    ko.applyBindings(new ExamTypesVM(), $('#main')[0]);
    ko.applyBindings(new UserMenuVM(), $('#menu')[0]);
});