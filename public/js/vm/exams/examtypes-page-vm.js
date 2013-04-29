require(['/js/require-config.js'], function () {
    require(['underscore', 'knockback', 'knockout', 'backbone', '/js/collections/exams.js',
        '/js/collections/examtypes.js', '/js/models/examtype.js', '/js/vm/admin/user-menu-vm.js'],
        function (_, kb, ko, Backbone, AllExams, AllExamTypes, ExamType, UserMenuVM) {
            var self = this;

            AllExamTypes.fetch();
            AllExams.fetch();

            self.examtypes = kb.collectionObservable(AllExamTypes);
            self.newExamType = ko.observable(false);
            self.title = ko.observable();
            self.tag = ko.observable();

            self.deleteExamType = function (examType) {
                confirm('Are you sure you want to delete this exam type?', function () {
                    AllExamTypes.remove(examType.model());
                    examType.model().destroy();
                });
                AllExamTypes.fetch();
            };

            self.showAddExamType = function () {
                self.newExamType(true);
            }

            self.addExamType = function () {
                console.log("create exam type with title", self.title(), "and tag", self.tag());
                AllExamTypes.create({title:self.title(), tag:self.tag()});
                self.newExamType(false);
            };

            ko.applyBindings(self, $('#main')[0]);
            ko.applyBindings(new UserMenuVM(AllExams), $('#menu')[0]);
        });
});