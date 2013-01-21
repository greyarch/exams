define('exams', ['js/libs/knockout-2.2.0.js', 'models/exam', 'models/participant', 'exam-form', 'participant-form'],
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
                    self.exams(_.map(data, function (item) {
                        return  new Exam(item);
                    }));
                    self.setSelectedExam(self.selectedExam() ? self.selectedExam().id() : null);
                });
            };

            addExam = function () {
                console.log("add exam");
                ko.applyBindingsToNode($("#add-exam")[0], null, new ExamFormVM(new Exam(), self.loadAllExams));
                openModal('#add-exam', 'Add new exam');
            }

            editExam = function (exam) {
                console.log("edit exam");
                ko.applyBindingsToNode($("#add-exam")[0], null, new ExamFormVM(exam, self.loadAllExams));
                openModal('#add-exam', 'Edit exam');
            }

            addParticipant = function() {
                console.log("add participant");
                partmodel = new ParticipantFormVM(self.selectedExam().id(), new Participant(), self.loadAllExams);
                ko.applyBindingsToNode($("#add-participant")[0], null, partmodel);
                openModal('#add-participant', 'Add new participant');
            }

            editParticipant = function(participant) {
                console.log("edit participant", participant);
                partmodel = new ParticipantFormVM(self.selectedExam().id(), participant, self.loadAllExams);
                ko.applyBindingsToNode($("#add-participant")[0], null, partmodel);
                openModal('#add-participant', 'Edit participant');
            }

            self.loadAllExams();
        }
    });