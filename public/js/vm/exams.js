require(['js/libs/knockout-2.2.0.js', 'models/exam', 'models/participant', 'exam-form', 'user-menu'], function (ko, Exam, Participant, ExamFormVM, UserMenuVM) {
    function AppViewModel() {
        var self = this;

        self.exams = ko.observableArray([]);
        self.participants = ko.observableArray([]);
        self.selectedExam = ko.observable();

        self.setSelectedExam = function (examId) {
            self.selectedExam(null);
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

        self.hasSelectedExam = ko.computed(function () {
            return self.selectedExam() ? true : false;
        });

        addExam = function () {
            console.log("add exam");
            ko.applyBindingsToNode($("#add-exam")[0], null, new ExamFormVM(new Exam(), self.loadAllExams));
            openModal('#add-exam', 'Add new exam');
        }

        editExam = function () {
            console.log("edit exam");
            ko.applyBindingsToNode($("#add-exam")[0], null, new ExamFormVM(new Exam(self.selectedExam().toJSON()), self.loadAllExams));
            openModal('#add-exam', 'Edit exam');
        }

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
            Participant.remove(participant.id(), function () {
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

        self.loadAllExams();

        umVM = new UserMenuVM(self.exams);
        ko.applyBindings(umVM, $('#menu')[0]);
    }

    appVM = new AppViewModel();
    ko.applyBindings(appVM, $('#main')[0]);
});