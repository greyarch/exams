require(['js/libs/knockout-2.2.0.js', 'js/libs/lodash.min.js', 'models/examtype', 'user-menu'], function (ko, _, ExamType, UserMenuVM) {
//    function ExamTypesVM() {
        var self = this;

        self.examtypes = ko.observableArray([]);
        self.nextExams = ko.observableArray([]);

        self.loadExamTypes = function () {
            ExamType.getAll(function (data) {
                self.examtypes(_.map(data, function (item) {
                    return new ExamType(item);
                }));
            });
        };

        newExamType = function (title, tag) {
            console.log("adding an exam type");
            var ExamType = {title:title, tag:tag};
            $.post("/examtype", ExamType, function () {
                console.log("created the exam type");
                self.loadExamTypes();
            });

        };

        deleteExamType = function (examType) {
            examType.delete(function () {
                self.loadExamTypes();
            });
        };

        self.loadExamTypes();
//    }

//    etVM = new ExamTypesVM();
    ko.applyBindings(self, $('#main')[0]);
});