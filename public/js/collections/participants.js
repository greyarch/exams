define(['/js/models/participant.js', 'backbone'], function (Participant, Backbone) {
    return Backbone.Collection.extend({
        url: '/exam/:id/participants',
        model: Participant
    });
});