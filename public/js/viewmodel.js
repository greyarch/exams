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

function ExamType(json) {
    var self = this;
    self.id = ko.observable(json.id);
    self.title = ko.observable(json.title);
    self.tag = ko.observable(json.tag);

    self.toJSON = function () {
        return {
            id:self.id(),
            title:self.title(),
            tag:self.tag()
        }
    }
}

function AppViewModel() {
    var self = this;

    self.exams = ko.observableArray([]);
    self.participants = ko.observableArray([]);
    self.examtypes = ko.observableArray([]);
    self.tests = ko.observableArray([]);
    self.selectedExam = ko.observable();

    self.nextExams = ko.computed(function () {
        var today = moment(new Date());
        var nextExams = _.filter(self.exams(), function (exam) {
            return exam.date() > today;
        })
        return nextExams;
    });

    self.availablePlaces = ko.observableArray(['Sofia, Bulgaria', 'Bucharest, Romania']);

    self.setSelectedExam = function (examId) {
        console.log("selecting exam with id", examId);
        var queriedExam = /selectedExam=(\d+)/.exec(document.location.search);
        var selectedExamId = examId ? examId : (queriedExam ? parseInt(queriedExam[1]) : null);
        if (selectedExamId) {
            var q = document.location.pathname;
            if (q != '/exams') {
                document.location = "/exams?selectedExam=" + selectedExamId;
            } else {
                var se = _.find(self.exams(), function (item) {
                    return item.id() == selectedExamId;
                });
                if (se) {
                    self.selectedExam(se);
                    self.showParticipants(self.selectedExam());
                }
            }
        }
    }

    isSelectedExam = function (exam) {
        if (self.selectedExam()) {
            return exam.id() === self.selectedExam().id();
        } else
            return false;
    };

    deleteExam = function (exam) {
        console.log("deleting exam with id: ", exam.id());
        $.ajax({
            url:"/exam/id/" + exam.id(),
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
            url:"/participant/id/" + participant.id(),
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
        self.setSelectedExam(exam.id());
    };

    self.showParticipants = function (exam) {
        console.log("getting all participants for exam with id ", exam.id());
        $.getJSON('/exam/id/' + exam.id() + '/participant', function (data) {
            self.participants(_.map(data, function (item) {
                return new Participant(item);
            }));
        });
    };

    self.loadAllExams = function () {
        self.participants([]);
        $.getJSON('/exam', function (data) {
            console.log("getting all exam");
            self.exams(_.map(data, function (item) {
                return  new Exam(item);
            }));
            self.setSelectedExam(self.selectedExam() ? self.selectedExam().id() : null);
        });
    };

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

    newExam = function (title, place, date, type, test, proctor) {
        console.log("adding an exam");
        var exam = {
            date:date,
            title:title,
            place:place,
            exam_type_id:type,
            test_id:test,
            proctor:proctor
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
            pass:pass ? 1 : 0
        };
        $.post("/exam/id/" + examId + "/participant", participant, function () {
            console.log("created the participant");
            self.loadAllExams();
        });
    };

    newExamType = function (title, tag) {
        console.log("adding an exam type");
        var ExamType = {title:title, tag:tag};
        $.post("/examtype", ExamType, function () {
            console.log("created the exam type");
            self.loadExamTypes();
        });

    };

    deleteExamType = function (examType) {
        console.log("deleting Exam Type with id: ", examType.id());
        $.ajax({
            url:"/examtype/id/" + examType.id(),
            type:"DELETE",
            success:function () {
                self.loadExamTypes();
            },
            error:function (jqXhr) {
                console.log("error while trying to delete Exam Type: " + jqXhr.responseText);
            }
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
    appVM.loadTests();
    appVM.loadExamTypes();
    appVM.loadAllExams();
});
