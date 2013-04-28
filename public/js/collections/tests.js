define(['/js/models/test.js', 'backbone'], function (Test, Backbone) {
    var AllTests = Backbone.Collection.extend({
        url: "/test",
        model: Test
    });

    return new AllTests();
});