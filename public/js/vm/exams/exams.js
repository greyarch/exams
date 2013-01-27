define(['js/libs/knockout-2.2.0.js', '/js/models/exam.js', '/js/models/participant.js', 'exam-form', 'participant-form'],
    function (ko, Exam, Participant, ExamFormVM, ParticipantFormVM) {
        return function AppViewModel() {
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
                var ex = exam || self.selectedExam();
                ex.loadParticipantsAsJSON(function (data) {
                    self.participants(_.map(data, function (item) {
                        return new Participant(item);
                    }));
                });
            };

            self.loadAllExams = function () {
                self.participants([]);
                Exam.getAll(function (data) {
                    self.exams(data);
                    self.setSelectedExam(self.selectedExam() ? self.selectedExam().id() : null);
                });
            };

            self.efvm = new ExamFormVM(new Exam(), self.loadAllExams);
            ko.applyBindings(self.efvm, $("#add-exam")[0]);
            self.efvm.loadExamTypes();
            self.efvm.loadTests();

            addExam = function () {
                console.log("add exam");
                self.efvm.exam(new Exam());
                openModal('#add-exam', 'Add new exam');
            }

            editExam = function (exam) {
                self.efvm.exam(new Exam(exam.toJSON()));
                openModal('#add-exam', 'Edit exam');
            }

            self.pfvm = new ParticipantFormVM(new Participant(), self.loadAllExams);
            ko.applyBindings(self.pfvm, $("#add-participant")[0]);

            addParticipant = function () {
                console.log("add participant");
                self.pfvm.participant(new Participant());
                self.pfvm.examId = self.selectedExam().id();
                openModal('#add-participant', 'Add new participant');
            }

            editParticipant = function (participant) {
                console.log("edit participant", participant);
                self.pfvm.participant(new Participant(participant.toJSON()));
                self.pfvm.examId = self.selectedExam().id();
                openModal('#add-participant', 'Edit participant');
            }

            self.loadAllExams();
        }
    });