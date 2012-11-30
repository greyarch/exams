function Exam(json) {
    var self = this;
    self.participants = ko.observableArray(json.participants);
    self.place = ko.observable(json.place);
    self.title = ko.observable(json.title);
    self.id = ko.observable(json.id);

    self.date = ko.computed(function() {
        return moment(json.date, "DD-MM-YYYY");
    });

    self.day = ko.computed(function() {
        return self.date().date();
    });

    self.month = ko.computed(function() {
        return self.date().month() + 1;
    });

    self.year = ko.computed(function() {
        return self.date().year();
    });
}

function AppViewModel() {
    var self = this;

    self.exams = ko.observableArray([]);
    self.participants = ko.observableArray([]);
    self.availablePlaces = ko.observableArray(['Sofia, Bulgaria', 'Bucharest, Romania']);

    deleteExam = function(exam) {
        $.ajax({
            url: "exam/" + exam.id(),
            type: "DELETE",
            success: function() {
                self.getAllExams();
            },
            error: function(jqXhr) {
                console.log("the error is: " + jqXhr.responseText);
            }
        });
    };

    showParticipants = function(exam) {
        self.participants(exam.participants());
    };

    self.getAllExams = function() {
        $.getJSON('exam', function(data) {
            console.log("getting all exams");
            self.exams($.map(data, function(item) {
                return new Exam(item);
            }));
        });
    };

    newExam = function(title, place, date) {
        console.log("adding an exam");
        $.post('exam', {
            date: date,
            title: title,
            place: place
        }, function() {
            console.log("created the exam");
            self.getAllExams();
        }, "json");
    };
}

$(function() {
    $(".datepicker").click(function() {
        $(".datepicker").glDatePicker({
            zIndex: 100,
            onChange: function(target, newDate)
            {
                target.val(
                        newDate.getDate() + "/" +
                        (newDate.getMonth() + 1) + "/" +
                        newDate.getFullYear());
            }
        });
    });

    appVM = new AppViewModel();
    ko.applyBindings(appVM);
    appVM.getAllExams();
});
