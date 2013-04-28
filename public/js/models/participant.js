define(['backbone'], function (Backbone) {
    return Backbone.Model.extend({
        urlRoot:'/participant',
        defaults:{
            company:"",
            first_name:"",
            last_name:"",
            email:"",
            price:"",
            fee:"",
            result:"",
            pass:0
        }
    });
});