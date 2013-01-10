define(['js/libs/knockout-2.2.0.js', 'js/libs/lodash.min.js', 'models/examtype'], function (ko, _, ExamType) {

    function ExamFormVM(exam) {
        var self = this;

        self.exam = exam;
        self.examtypes = ko.observableArray([]);
        self.tests = ko.observableArray([]);
        self.availablePlaces = ko.observableArray(['Sofia, Bulgaria', 'Bucharest, Romania']);

        self.loadExamTypes = function () {
            console.log("getting all exam types");
            $.getJSON('/examtype', function (data) {
                self.examtypes(_.map(data, function (item) {
                    return new ExamType(item);
                }));
                console.log("examtypes are", self.examtypes());
            });
        };

        self.loadTests = function () {
            console.log("getting all exam types");
            $.getJSON('/test', function (data) {
                self.tests(data);
                console.log("examtypes are", self.tests());
            });
        };

        saveExam = function (date) { //ugly hack cause the date picker does not work with knockout
            var ex = self.exam().toJSON();
            ex.date = date; //ugly hack cause the date picker does not work with knockout
            console.log("saving exam", ex);
            $.post('/exam', ex, function (data) {
                console.log("exam saved", data);
//                appVM.loadAllExams(); //TODO remove tight coupling with main VM
            }, "json");
        };

        self.loadExamTypes();

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
    }

    return ExamFormVM;
});