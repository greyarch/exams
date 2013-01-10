require(['js/libs/knockout-2.2.0.js', 'js/libs/lodash.min.js', 'models/examtype', 'models/exam'], function (ko, _, ExamType, Exam) {
    function ExamTypesVM() {
        var self = this;

        self.examtypes = ko.observableArray([]);
        self.nextExams = ko.observableArray([]);

        self.loadNextExams = function () {
            Exam.getAll(function (data) {
                console.log("loaded all exams", data);
                var today = moment();
                self.nextExams(_.last(_.filter(data, function (exam) {
                    return moment(new Date(exam.date)) > today;
                }), 3));
            });
        }

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
    }

    var etVM = new ExamTypesVM();
    etVM.loadExamTypes();
//    etVM.loadNextExams();
    ko.applyBindings(etVM, $('#main')[0]);
//    ko.applyBindings(etVM, $('#menu')[0]);
});