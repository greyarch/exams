define(['js/libs/knockout-2.2.0.js', 'js/libs/lodash.min.js', 'models/examtype', 'models/test'], function (ko, _, ExamType, Test) {

    function ExamFormVM(exam, onSave) {
        var self = this;

        self.exam = exam;
        self.onSave = onSave;
        self.examtypes = ko.observableArray([]);
        self.tests = ko.observableArray([]);
        self.availablePlaces = ko.observableArray(['Sofia, Bulgaria', 'Bucharest, Romania']);

//        self.selectedExamType = ko.computed(function() {
//            return _.find(self.examtypes(), function(item) {
//                item.id() === self.exam.typeId();
//            });
//        });

        self.loadExamTypes = function () {
            ExamType.getAll(function (data) {
                self.examtypes(data);
                console.log("examtypes are", self.examtypes());
            });
        };

        self.loadTests = function () {
            Test.getAll(function (data) {
                self.tests(data);
                console.log("tests are", self.tests());
            });
        };

        saveExam = function (date) {
            self.exam.date(date); //ugly hack cause the date picker does not work with knockout
            self.exam.save(self.onSave);
        };

        $(".datepicker").click(function () {
            $(".datepicker").glDatePicker({
                zIndex:100,
                onChange:function (target, newDate) {
                    target.val(
                        newDate.getFullYear() + "-" +
                            (newDate.getMonth() + 1) + "-" +
                            newDate.getDate()
                    );
                }
            });
        });

        self.loadExamTypes();
        self.loadTests();
    }

    return ExamFormVM;
});