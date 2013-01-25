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
        self.date = ko.observable(moment(json.date).format("YYYY-MM-DD"));

        self.jsDate = ko.computed(function () {
            if (self.date()) {
                return moment(self.date(), "YYYY-MM-DD");
            } else {
                return moment();
            }
        });

        self.day = ko.computed(function () {
            return self.jsDate().date();
        });

        self.month = ko.computed(function () {
            return self.jsDate().format('MMM');
        });

        self.year = ko.computed(function () {
            return self.jsDate().year();
        });

        self.toJSON = function () {
            return {
                id:self.id(),
                title:self.title(),
                place:self.place(),
                date:self.date(),
                exam_type_id:self.typeId(),
                test_id:self.testId(),
                proctor:self.proctor()
            }
        }

        self.loadParticipantsAsJSON = function (onSuccess, onError) {
            console.log("getting all participants for exam with id ", self.id());
            $.ajax({
                url:"/exam/id/" + self.id() + "/participant",
                type:"GET",
                success:onSuccess,
                error:onError
            }, "json");
        }

        self.save = function (onSuccess, onError) {
            var ex = self.toJSON();
            var method = "POST";
            var url = "/exam"
            if (ex.id) {
                console.log("updating exam", ex);
                var method = "PUT";
                var url = "/exam/id/" + ex.id;
            } else {
                console.log("adding new exam", ex);
            }
            $.ajax({
                type:method,
                url:url,
                data:ex,
                success:onSuccess,
                error:onError
            }, "json");
        }
    }

    Exam.getAll = function (onSuccess, onError) {
        console.log("getting all exams");
        $.ajax({
            url:"/exam",
            type:"GET",
            success:onSuccess,
            error:onError
        }, "json");
    }

    Exam.remove = function (examId, onSuccess, onError) {
        console.log("deleting exam with id: ", examId);
        $.ajax({
            url:"/exam/id/" + examId,
            type:"DELETE",
            success:onSuccess,
            error:onError
        }, "json");
    }

    return Exam;
});