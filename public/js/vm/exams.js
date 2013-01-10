require(['js/libs/knockout-2.2.0.js', 'models/exam', 'models/participant', 'exam-form'], function(ko, Exam, Participant, ExamFormVM) {
    function AppViewModel() {
        var self = this;

        self.exams = ko.observableArray([]);
        self.participants = ko.observableArray([]);
        self.examtypes = ko.observableArray([]);
        self.tests = ko.observableArray([]);
        self.selectedExam = ko.observable();

        self.formModel = ko.observable(new ExamFormVM(self.selectedExam));

        self.nextExams = ko.computed(function () {
            var today = moment();
            var nextExams = _.filter(self.exams(), function (exam) {
                return exam.date() > today;
            })
            return _.last(nextExams, 3);
        });

        self.setSelectedExam = function (examId) {
            console.log("selecting exam with id", examId);
            var queriedExam = /selectedExam=(\d+)/.exec(document.location.search);
            var selectedExamId = examId || (queriedExam ? parseInt(queriedExam[1]) : null);
            if (selectedExamId) {
                var q = document.location.pathname;
                if (q != '/exams') {
                    document.location = "/exams?selectedExam=" + selectedExamId;
                } else {
                    var se = _.find(self.exams(), function (item) {
                        return item.id() == selectedExamId;
                    });
                    if (se) {
                        self.selectedExam(se);
                        self.showParticipants(self.selectedExam());
                    }
                }
            } else {
                self.selectedExam(null);
            }
        }

        self.hasSelectedExam = ko.computed(function() {
            return self.selectedExam() ? true : false;
        });

        isSelectedExam = function (exam) {
            if (self.selectedExam()) {
                return exam.id() === self.selectedExam().id();
            } else
                return false;
        };

        deleteExam = function (exam) {
            Exam.remove(exam.id(), function () {
                self.loadAllExams();
            });
        };

        deleteParticipant = function (participant) {
            Participant.remove(participant.id(), function() {
                self.loadAllExams();
            });
        };

        selectExam = function (exam) {
            console.log("selected exam with id: ", exam.id());
            self.setSelectedExam(exam.id());
        };

        self.showParticipants = function (exam) {
            exam.loadParticipantsAsJSON(function (data) {
                self.participants(_.map(data, function (item) {
                    return new Participant(item);
                }));
            });
        };

        self.loadAllExams = function () {
            self.participants([]);
            Exam.getAll(function (data) {
                self.exams(_.map(data, function (item) {
                    return  new Exam(item);
                }));
                self.setSelectedExam(self.selectedExam() ? self.selectedExam().id() : null);
            });
        };

        newParticipant = function (company, firstName, lastName, email, price, fee, result, pass) {
            var examId = self.selectedExam().id();
            var participant = {
                company:company,
                first_name:firstName,
                last_name:lastName,
                email:email,
                price:price,
                fee:fee,
                result:result,
                pass:pass ? 1 : 0
            };
            Participant.save(examId, participant, function () {
                self.loadAllExams();
            });
        };
    }

    appVM = new AppViewModel();
    appVM.loadAllExams();
    ko.applyBindings(appVM, $('#main')[0]);
    ko.applyBindings(appVM, $('#menu')[0]);
});