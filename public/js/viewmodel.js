function Exam(json) {
    var self = this;
    self.participants = ko.observableArray(json.participants);
    self.place = ko.observable(json.place);
    self.title = ko.observable(json.title);
    self.typeId = ko.observable(json.exam_type_id);
    self.testId = ko.observable(json.test_id);
    self.proctor = ko.observable(json.proctor);
    self.id = ko.observable(json.id);

    self.date = ko.computed(function () {
        return moment(json.date, "YYYY-MM-DD");
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
}

function Participant(json) {
    var self = this;
    self.id = ko.observable(json.id);
    self.company = ko.observable(json.company);
    self.firstName = ko.observable(json.first_name);
    self.lastName = ko.observable(json.last_name);
    self.email = ko.observable(json.email);
    self.price = ko.observable(json.price);
    self.fee = ko.observable(json.fee);
    self.result = ko.observable(json.result);
    self.pass = ko.observable(json.pass);

    self.passStyle = ko.computed(function () {
        return self.pass() ? 'icon-tick glossy green-gradient' : 'icon-cross glossy red-gradient';
    });

    self.toJSON = function () {
        return {
            id:self.id(),
            company:self.company(),
            first_name:self.firstName(),
            last_name:self.lastName(),
            email:self.email(),
            price:self.price(),
            fee:self.fee(),
            result:self.result(),
            pass:self.pass()
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
        } else
            return false;
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
                console.log("error while trying to delete exam: " + jqXhr.responseText);
            }
        });
    };

    deleteParticipant = function (participant) {
        console.log("deleting exam with id: ", participant.id());
        $.ajax({
            url:"participant/" + participant.id(),
            type:"DELETE",
            success:function () {
                self.loadAllExams();
            },
            error:function (jqXhr) {
                console.log("error while trying to delete participant: " + jqXhr.responseText);
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
        console.log("getting all participants for exam with id ", exam.id());
        $.getJSON('exam/' + exam.id() + '/participant', function (data) {
            self.participants($.map(data, function (item) {
                return new Participant(item);
            }));
        });
    };

    self.loadAllExams = function () {
        self.participants([]);
        $.getJSON('exam', function (data) {
            console.log("getting all exam");
            self.exams($.map(data, function (item) {
                var newExam = new Exam(item);
                if (isSelectedExam(newExam))
                    self.showParticipants(newExam);
                return newExam;
            }));
        });
    };

    newExam = function (title, place, date) {
        console.log("adding an exam");
        var exam = {
            date:date,
            title:title,
            place:place,
            exam_type_id:0,
            test_id:0,
            proctor:"Mr. Proctor"
        };
        $.post('exam', exam, function () {
            console.log("created the exam");
            self.loadAllExams();
        }, "json");
    };

    newParticipant = function (company, firstName, lastName, email, price, fee, result, pass) {
        console.log("adding a participant");
        var examId = self.selectedExam().id();
        var participant = {
            company:company,
            first_name:firstName,
            last_name:lastName,
            email:email,
            price:price,
            fee:fee,
            result:result,
            pass:pass
        };
        $.post("exam/" + examId + "/participant", participant, function () {
            console.log("created the participant");
            self.loadAllExams();
        });
    };
}

$(function () {
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

    appVM = new AppViewModel();
    ko.applyBindings(appVM);
    appVM.loadAllExams();
});
