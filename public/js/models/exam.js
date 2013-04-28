define(['backbone', '/js/collections/participants.js'], function (Backbone, Participants) {
    return Backbone.Model.extend({
        urlRoot:'/exam',
        defaults:{
            title:"",
            place:"",
            date:moment().format('YYYY-M-D'),
            exam_type_id:"",
            test_id:"",
            proctor:""
        }
    });
});