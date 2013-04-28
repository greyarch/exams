require(['/js/require-config.js', '/js/vm/error-handling.js'], function() {
    require(['underscore', 'knockback', 'knockout', 'backbone', '/js/collections/exams.js',
        '/js/collections/examtypes.js', '/js/collections/participants.js', '/js/collections/tests.js',
        '/js/models/exam.js', '/js/vm/exams/exam-vm.js', '/js/models/participant.js', '/js/vm/exams/participant-vm.js', '/js/vm/admin/user-menu-vm.js'],
        function (_, kb, ko, Backbone, AllExams, AllExamTypes, Participants, AllTests, Exam, ExamVM, Participant, ParticipantVM, UserMenuVM) {
            var self = this;
            dispatcher = _.clone(Backbone.Events);

            AllExams.fetch();
            AllExamTypes.fetch();
            AllTests.fetch();

            ko.extenders.persist = function (target, option) {
                target.subscribe(function (newValue) {
                    store.set(option, newValue);
                });
                return target;
            };

            self.examParticipants = new Participants();

            self.availablePlaces = ['Sofia, Bulgaria', 'Bucharest, Romania'];
            self.examtypes = kb.collectionObservable(AllExamTypes);
            self.tests = kb.collectionObservable(AllTests);
            self.selectedExamId = ko.observable().extend({persist:"selectedExamId"});

            self.exams = kb.collectionObservable(AllExams, {view_model:ExamVM});
            self.participants = kb.collectionObservable(self.examParticipants, {view_model:ParticipantVM});

            dispatcher.on('select-exam',function (examId) {
                self.selectedExamId(examId);
                self.examParticipants.url = '/exam/' + examId + '/participant';
                self.examParticipants.fetch();
            }).on('edit-exam',function (exam) {
                    self.editedExam = exam;
                    ko.applyBindings(new ExamVM(self.editedExam), $('#add-exam')[0]);
                }).on('edit-participant',function (participant) {
                    self.editedParticipant = participant;
                    ko.applyBindings(new ParticipantVM(self.editedParticipant), $('#add-participant')[0]);
                }).on('save-exam', function () {
                    self.editedExam.set({date:$('#exam-date').val()}); //TODO remove ugly hack
                    $.modal.current.closeModal();
                    self.editedExam.save(null, {error:onErr});
                    AllExams.fetch()
                }).on('delete-exam', function (examId) {
                    if (examId === self.selectedExamId()) self.selectedExamId(null);
                }).on('save-participant', function () {
                    $.modal.current.closeModal();
                    self.editedParticipant.set({exam_id:self.selectedExamId()});
                    self.editedParticipant.save(null, {error:onErr});
                    self.examParticipants.fetch()
                });

            self.addExam = function () {
                console.log("add exam");
                dispatcher.trigger('edit-exam', new Exam());
                openModal('#add-exam', 'Add new exam');
            };

            self.selectExam = function (exam) {
                var examId = exam.model().get('id');
                console.log("selected exam", examId);
                dispatcher.trigger('select-exam', examId);
            };

            self.hasSelectedExam = ko.computed(function () {
                return self.selectedExamId() ? true : false;
            });

            self.isSelectedExam = function (exam) {
                return self.selectedExamId() ? exam.model().get('id') == self.selectedExamId() : false;
            };

            self.addParticipant = function () {
                console.log("add participant");
                dispatcher.trigger('edit-participant', new Participant());
                openModal('#add-participant', 'Add new participant');
            };

            dispatcher.trigger('select-exam', store.get("selectedExamId"));

            ko.applyBindings(self, $('#main')[0]);
            ko.applyBindings(new UserMenuVM(AllExams), $('#menu')[0]);
        }
    );
});