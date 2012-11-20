function AppViewModel() {
    var self = this;

    self.exams = ko.observableArray([]);
    self.participants = ko.observableArray([]);

    deleteExam = function(exam) {
        self.exams.remove(exam);
    }

    showParticipants = function() {
        $.getJSON('data/participants.json', function(data) {
            self.participants(data);
        });
    }
    
    self.getAllExams = function() {
        $.getJSON('exam', function(data) {
            console.log("getting all exams");
            self.exams(data);
        });
    }
    
    newExam = function() {
        $.post('exam', function(data) {
            console.log("created the exam");
            self.getAllExams();
        });
    }
}

$(function(){
    console.log("apply KO");
    appVM = new AppViewModel();
    ko.applyBindings(appVM);
    appVM.getAllExams();
});
