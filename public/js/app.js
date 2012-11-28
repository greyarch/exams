function AppViewModel() {
    var self = this;

    self.exams = ko.observableArray([]);
    self.participants = ko.observableArray([]);

    self.examTitle = ko.observable();
    self.availablePlaces = ko.observableArray(['Sofia, Bulgaria', 'Bucharest, Romania']);
    self.selectedPlace = ko.observable();

    deleteExam = function(exam) {
        $.ajax({
            url: "exam/" + exam._id,
            type: "DELETE",
            success: function() {
                self.exams.remove(exam);
            },
            error: function(jqXhr, status, error) {
                console.log("error is: " + jqXhr.responseText)
            }
        });
    }

    showParticipants = function() {
        $.getJSON('data/participants.json', function(data) {
            self.participants(data);
        });
    }
    
    self.getAllExams = function() {
        $.getJSON('exam', function(data) {
            console.log("getting all exams");
            self.exams([]);
            self.exams(data);
        });
    }

    newExam = function() {
        console.log("adding an exam");
        openModal('Add new exam', 'My modal content', {
            'Cancel': function(modal) {
                modal.closeModal();
            },
            'Save': function(modal) {
                modal.closeModal();
                $.post('exam', {
                    date: "20", 
                    month: "05", 
                    year: "2010",
                    title: self.examTitle(), 
                    place:self.selectedPlace()
                }, function(data) {
                    console.log("created the exam");
                    self.getAllExams();
                }, "json");
            }
        });
    }
}

$(function(){
    console.log("apply KO");
    appVM = new AppViewModel();
    ko.applyBindings(appVM);
    appVM.getAllExams();
});
