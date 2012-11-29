function AppViewModel() {
    var self = this;

    self.exams = ko.observableArray([]);
    self.participants = ko.observableArray([]);

    self.examTitle = ko.observable();
    self.availablePlaces = ko.observableArray(['Sofia, Bulgaria', 'Bucharest, Romania']);
    self.selectedPlace = ko.observable();

    deleteExam = function (exam) {
        $.ajax({
            url:"exam/" + exam.id,
            type:"DELETE",
            success:function () {
                self.getAllExams();
            },
            error:function (jqXhr) {
                console.log("the error is: " + jqXhr.responseText);
            }
        });
    };

    showParticipants = function (exam) {
        self.participants(exam.participants);
    };

    self.getAllExams = function () {
        $.getJSON('exam', function (data) {
            console.log("getting all exams");
            self.exams([]);
            self.exams(data);
        });
    };

    newExam = function () {
        console.log("adding an exam");
        openModal('Add new exam', {
            'Cancel':{
                click:function (modal) {
                    modal.closeModal();
                },
                classes: "icon-cross glossy red-gradient"
            },
            'Save':{
                click:function (modal) {
                    modal.closeModal();
                    $.post('exam', {
                        date:"20",
                        month:"05",
                        year:"2010",
                        title:self.examTitle(),
                        place:self.selectedPlace()
                    }, function () {
                        console.log("created the exam");
                        self.getAllExams();
                    }, "json");
                },
                classes: "icon-tick glossy green-gradient"
            }
        });
    };
}

$(function () {
    console.log("apply KO");
    appVM = new AppViewModel();
    ko.applyBindings(appVM);
    appVM.getAllExams();
});
