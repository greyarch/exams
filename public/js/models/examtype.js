define(['backbone'], function (Backbone) {
    var ExamType = Backbone.Model.extend({
        urlRoot:'/examtype'
    });
    return ExamType;
});