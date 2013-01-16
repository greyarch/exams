define('user-menu', ['js/libs/knockout-2.2.0.js', 'js/libs/lodash.min.js', 'models/exam'], function (ko, _, Exam) {
    return function UserMenuVM(exams) {
        var self = this;

        self.exams = exams || ko.observableArray([]);

        self.nextExams = ko.computed(function () {
            var today = moment();
            var nextExams = _.filter(self.exams(), function (exam) {
                return exam.jsDate() > today;
            })
            return _.last(nextExams, 3);
        });
    }
});