define(['knockout', 'knockback', '/js/models/participant.js'], function (ko, kb, Participant) {
    ko.bindingHandlers.switch = {
        init:function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            if (viewModel.model().attributes.pass) {
                $('#part-pass-div span.switch').addClass('checked');
            } else {
                $('#part-pass-div span.switch').removeClass('checked');
            }
        }
    };

    var ParticipantVM = kb.ViewModel.extend({
        constructor:function (model) {
            var self = this;
            kb.ViewModel.prototype.constructor.call(self, model);

            self.passText = ko.computed(function () {
                return self.pass() ? "PASS" : "FAIL";
            });

            self.passClass = ko.computed(function () {
                return self.pass() ? "tag green-bg" : "tag red-bg";
            });

            self.editParticipant = function (participant) {
                console.log("edit participant", self.model());
                dispatcher.trigger('edit-participant', participant.model().clone());
                openModal('#add-participant', 'Edit participant');
            };

            self.saveParticipant = function (participant) {
                console.log("save participant", self.model());
                dispatcher.trigger('save-participant');
            };

            self.deleteParticipant = function (participant) {
                confirm('Are you sure you want to delete this participant?', function () {
                    console.log("delete participant", self.model());
                    participant.model().destroy();
                });
            };

            self.passHandle = function () {
                self.pass(!$('#part-pass-div span.switch').hasClass('checked'));
            };

            return self;
        }
    });

    return ParticipantVM;
});