define(['js/libs/knockout-2.2.0.js', 'js/libs/lodash.min.js', '/js/models/exam.js'], function (ko, _, Exam) {
    return function UserMenuVM(exams) {
        var self = this;

        self.exams = ko.observableArray([]);
        if (exams) {
            self.exams = exams;
        } else {
            Exam.getAll(self.exams);
        }

        self.nextExams = ko.computed(function () {
            var today = moment();
            var nextExams = _.filter(self.exams(), function (exam) {
                return exam.jsDate() > today;
            })
            return _.last(nextExams, 3);
        });

        if (typeof window.selectExam === 'undefined') {
            window.selectExam = function(exam) {
                document.location = "/exams?selectedExam=" + exam.id();
            }
        }
    }
});