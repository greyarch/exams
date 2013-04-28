define(['knockout', 'knockback'], function (ko, kb) {
    var ExamVM = kb.ViewModel.extend({
        constructor:function (model) {
            var self = this;
            kb.ViewModel.prototype.constructor.call(self, model);

            self.jsDate = ko.computed(function () {
                return moment(self.date());
            });

            self.deleteExam = function (exam) {
                confirm('Are you sure you want to delete this exam?', function () {
                    var examId = exam.model().get('id');
                    console.log("delete exam with id", examId);
                    exam.model().destroy();
                    dispatcher.trigger('delete-exam', examId);
                });
            };

            self.editExam = function (exam) {
                console.log("edit exam with id", exam.model().get('id'));
                dispatcher.trigger('edit-exam', exam.model().clone());
                openModal('#add-exam', 'Add new exam');
            };

            self.saveExam = function () {
                console.log("save exam", editedExam);
                dispatcher.trigger('save-exam', editedExam);
            };
        }
    });

    return ExamVM;
});