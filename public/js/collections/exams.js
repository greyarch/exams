define(['/js/models/exam.js', 'backbone'], function (Exam, Backbone) {
    var Exams = Backbone.Collection.extend({
        url: "/exam",
        model: Exam
    });

    return new Exams();
});