define(['/js/models/examtype.js', 'backbone'], function (ExamType, Backbone) {
    var ExamTypes = Backbone.Collection.extend({
        url: "/examtype",
        model: ExamType
    });

    return new ExamTypes();
});