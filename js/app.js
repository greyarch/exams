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
}

$(function(){
    console.log("apply KO");
    appVM = new AppViewModel();
    ko.applyBindings(appVM);
    $.getJSON('data/exams.json', function(data) {
        appVM.exams(data);
    });
});
