function Exam(json) {
    var self = this;
    self.participants = ko.observableArray(json.participants);
    self.place = ko.observable(json.place);
    self.title = ko.observable(json.title);
    self.id = ko.observable(json.id);

    self.date = ko.computed(function () {
        return moment(json.date, "DD-MM-YYYY");
    });

    self.day = ko.computed(function () {
        return self.date().date();
    });

    self.month = ko.computed(function () {
        return self.date().month() + 1;
    });

    self.year = ko.computed(function () {
        return self.date().year();
    });

    self.toJSON = function() {
        return {
            id: self.id(),
            title: self.title(),
            place: self.place(),
            date: self.date().format("DD/MM/YYYY"),
            participants: self.participants()
        }
    }
}

function AppViewModel() {
    var self = this;

    self.exams = ko.observableArray([]);
    self.participants = ko.observableArray([]);
    self.selectedExam = ko.observable();

    self.availablePlaces = ko.observableArray(['Sofia, Bulgaria', 'Bucharest, Romania']);

    isSelectedExam = function (exam) {
        if (self.selectedExam()) {
            return exam.id() === self.selectedExam().id();
        } else return false;
    };

    deleteExam = function (exam) {
        console.log("deleting exam with id: ", exam.id());
        $.ajax({
            url:"exam/" + exam.id(),
            type:"DELETE",
            success:function () {
                self.loadAllExams();
            },
            error:function (jqXhr) {
                console.log("the error is: " + jqXhr.responseText);
            }
        });
    };

    selectExam = function (exam) {
        console.log("selected exam with id: ", exam.id());
        if (exam !== self.selectedExam()) {
            self.selectedExam(exam);
            self.showParticipants(exam);
        }
    };

    self.showParticipants = function (exam) {
        console.log("showing exam participants");
        self.participants(exam.participants());
    };

    self.loadAllExams = function () {
        self.participants([]);
        $.getJSON('exam', function (data) {
            console.log("getting all exams");
            self.exams($.map(data, function (item) {
                var newExam = new Exam(item);
                if (isSelectedExam(newExam)) self.showParticipants(newExam);
                return newExam;
            }));
        });
    };

    newExam = function (title, place, date) {
        console.log("adding an exam");
        $.post('exam', {
            date:date,
            title:title,
            place:place
        }, function () {
            console.log("created the exam");
            self.loadAllExams();
        }, "json");
    };

    newParticipant = function (name, tags) {
        console.log("adding a participant");
        var exam = self.selectedExam().toJSON();
        var newParticipant = {name:name, tags:tags, country:'Bulgaria', actions:''};
        exam.participants.push(newParticipant);
        $.ajax({
            url:"exam",
            type:"PUT",
            data:exam,
            dataType:"json",
            success:function () {
                console.log("created the participant");
                self.loadAllExams();
            }});
    };
}

$(function () {
    $(".datepicker").click(function () {
        $(".datepicker").glDatePicker({
            zIndex:100,
            onChange:function (target, newDate) {
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
