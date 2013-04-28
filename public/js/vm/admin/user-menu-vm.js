define(['knockback', '/js/collections/exams.js',
    '/js/models/exam.js', '/js/vm/exams/exam-vm.js'],
    function (kb, AllExams, Exam, ExamVM) {
        return function (exams) {
            var self = this;
            self.nextExams = kb.collectionObservable(exams, {view_model:ExamVM, filters:function (model) {
                return model.get('date') < moment().format('YYYY-MM-DD');
            }});

            self.selectCurrentExam = function (exam) {
                if (typeof(selectExam) === 'function') {
                    selectExam(exam);
                } else {
                    var examId = typeof exam === "number" ? exam : exam.model().get('id');
                    store.set("selectedExamId", examId);
                    document.location = "/exams";
                }
            };
        };
    });