define(['js/libs/knockout-2.2.0.js', 'js/libs/lodash.min.js', '/js/models/participant.js'], function (ko, _, Participant) {

    return function ParticipantFormVM(participant, onSave) {
        var self = this;

        self.participant = (typeof participant === "function") ? participant : ko.observable(participant);
        self.onSave = onSave;
        self.examId = null;

        saveParticipant = function () {
            Participant.save(self.examId, self.participant().toJSON(), self.onSave);
        };
    }
});