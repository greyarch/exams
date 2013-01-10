define('models/exam', ['js/libs/knockout-2.2.0.js', 'js/libs/lodash.min.js'], function (ko, _) {
    function Exam(json) {
        var self = this;
        json = json || {};
        self.participants = ko.observableArray(json.participants || []);
        self.place = ko.observable(json.place);
        self.title = ko.observable(json.title);
        self.typeId = ko.observable(json.exam_type_id);
        self.testId = ko.observable(json.test_id);
        self.proctor = ko.observable(json.proctor);
        self.id = ko.observable(json.id);

        self.date = ko.computed(function () {
            if (json.date) {
                return moment(json.date, "YYYY-MM-DD");
            } else {
                return moment(new Date());
            }
        });

        self.day = ko.computed(function () {
            return self.date().date();
        });

        self.month = ko.computed(function () {
            return self.date().format('MMM');
        });

        self.year = ko.computed(function () {
            return self.date().year();
        });

        self.toJSON = function () {
            return {
                id:self.id(),
                title:self.title(),
                place:self.place(),
                date:self.date().format("YYYY-MM-DD"),
                exam_type_id:self.typeId(),
                test_id:self.testId(),
                proctor:self.proctor()
            }
        }

        self.loadParticipantsAsJSON = function(onSuccess) {
            console.log("getting all participants for exam with id ", self.id());
            $.getJSON('/exam/id/' + self.id() + '/participant', onSuccess);
        }
    }

    Exam.getAll = function (onSuccess) {
        console.log("getting all exams");
        $.getJSON('/exam', onSuccess);
    }

    Exam.remove = function (examId, onSuccess) {
        console.log("deleting exam with id: ", examId);
        $.ajax({
            url:"/exam/id/" + examId,
            type:"DELETE",
            success:onSuccess,
            error:function (jqXhr) { //TODO replace with onError maybe?
                console.log("error while trying to delete exam: " + jqXhr.responseText);
            }
        });
    }

    return Exam;
});