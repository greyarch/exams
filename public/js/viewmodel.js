ko.extenders.liveEditor = function (target) {
    target.editing = ko.observable(false);

    target.edit = function () {
        target.editing(true);
    };

    target.stopEditing = function () {
        target.editing(false);
    };
    return target;
};

ko.bindingHandlers.liveEditor = {
    init: function (element, valueAccessor) {
        var observable = valueAccessor();
        observable.extend({ liveEditor: this });
    },
    update: function (element, valueAccessor) {
        var observable = valueAccessor();
        ko.bindingHandlers.css.update(element, function () { return { editing: observable.editing }; });
    }
};

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

    self.partCompany = ko.observable();

    isSelectedExam = function(exam) {
        if (self.selectedExam()) {
            return exam.id() === self.selectedExam().id();
        } else
            return false;
    };

    deleteExam = function(exam) {
        console.log("deleting exam with id: ", exam.id());
        $.ajax({
            url: "exam/" + exam.id(),
            type: "DELETE",
            success: function() {
                self.loadAllExams();
            },
            error: function(jqXhr) {
                console.log("error while trying to delete exam: " + jqXhr.responseText);
            }
        });
    };

    deleteParticipant = function(participant) {
        console.log("deleting exam with id: ", participant.id);
        $.ajax({
            url: "participant/" + participant.id,
            type: "DELETE",
            success: function() {
                self.loadAllExams();
            },
            error: function(jqXhr) {
                console.log("error while trying to delete participant: " + jqXhr.responseText);
            }
        });
    };

    selectExam = function(exam) {
        console.log("selected exam with id: ", exam.id());
        if (exam !== self.selectedExam()) {
            self.selectedExam(exam);
            self.showParticipants(exam);
        }
    };

    self.showParticipants = function(exam) {
        console.log("getting all participants for exam with id ", exam.id());
        $.getJSON('exam/' + exam.id() + '/participant', function(data) {
            self.participants(data);
        });
    };

    self.loadAllExams = function() {
        self.participants([]);
        $.getJSON('exam', function(data) {
            console.log("getting all exam");
            self.exams($.map(data, function(item) {
                var newExam = new Exam(item);
                if (isSelectedExam(newExam))
                    self.showParticipants(newExam);
                return newExam;
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
            self.loadAllExams();
        }, "json");
    };

    newParticipant = function(firstName, lastName, company) {
        console.log("adding a participant");
        var examId = self.selectedExam().id();
        var newParticipant = {first_name: firstName, last_name: lastName, company: company};
        $.post("exam/" + examId + "/participant", newParticipant, function() {
            console.log("created the participant");
            self.loadAllExams();
        });
    };
}

$(function() {
    $(".datepicker").click(function() {
        $(".datepicker").glDatePicker({
            zIndex: 100,
            onChange: function(target, newDate) {
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
