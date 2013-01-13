require(['js/libs/knockout-2.2.0.js', 'js/libs/lodash.min.js', 'models/exam'], function (ko, _, Exam) {
    function UserMenuVM() {
        var self = this;

        self.exams = ko.observableArray([]);

        self.nextExams = ko.computed(function () {
            var today = moment();
            var nextExams = _.filter(self.exams(), function (exam) {
                return exam.jsDate() > today;
            })
            return _.last(nextExams, 3);
        });

        self.loadAllExams = function () {
            Exam.getAll(function (data) {
                self.exams(_.map(data, function (item) {
                    return  new Exam(item);
                }));
            });
        };

        self.loadAllExams();
    }


    umVM = new UserMenuVM();
    ko.applyBindings(umVM, $('#menu')[0]);
});