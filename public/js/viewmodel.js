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

    self.selected = ko.observable(false);
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
                self.loadAllExams();
            },
            error: function(jqXhr) {
                console.log("the error is: " + jqXhr.responseText);
            }
        });
    };

    selectExam = function(exam) {
        console.log("selected exam");
        if (!exam.selected()) {
            $.map(self.exams(), function(item) {
                item.selected(exam === item);
            });
            showParticipants(exam);
        }
    };

    showParticipants = function(exam) {
        console.log("showing exam participants");
        self.participants(exam.participants());
    };

    self.loadAllExams = function() {
        $.getJSON('exam', function(data) {
            console.log("getting all exams");
            self.exams($.map(data, function(item) {
                return new Exam(item);
            }));
            self.participants([]);
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
            self.loadAllExams();
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
    appVM.loadAllExams();
});
