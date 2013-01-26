define('models/exam', ['js/libs/knockout-2.2.0.js', 'js/libs/lodash.min.js', 'js/ajax.js'], function (ko, _, ajax) {
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
            ajax.get('/exam/id/' + self.id() + '/participant', onSuccess);
        }

        self.save = function (onSuccess, onError) {
            var ex = self.toJSON();
            if (ex.id) {
                console.log("updating exam", ex);
                ajax.put('/exam/id/' + ex.id, ex, onSuccess);
            } else {
                console.log("adding new exam", ex);
                ajax.post('/exam', ex, onSuccess);
            }
        }
    }

    Exam.getAll = function (onSuccess, onError) {
        console.log("getting all exams");
        ajax.get('/exam', onSuccess, onError);
    }

    Exam.remove = function (examId, onSuccess, onError) {
        console.log("deleting exam with id: ", examId);
        ajax.del('/exam/id/' + examId, onSuccess, onError);
    }

    return Exam;
});