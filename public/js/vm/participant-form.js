define('participant-form', ['js/libs/knockout-2.2.0.js', 'js/libs/lodash.min.js', 'models/participant'], function (ko, _, Participant) {

    return function ParticipantFormVM(examId, participant, onSave) {
        var self = this;

            self.participant = (typeof participant === "function") ? participant : ko.observable(participant);
        self.onSave = onSave;
        self.examId = examId;

        self.passAttrib = ko.computed(function() {
            return self.participant().pass() ? "checked" : undefined;
        });

        saveParticipant = function (passed) {
            Participant.save(self.examId, self.participant().toJSON(), self.onSave);
        };
    }
});