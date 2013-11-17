require(['/js/require-config.js'], function() {
    require(['knockout'],
        function (ko) {
            var vm = {
                quiz: ko.observable(),
                cmuid: ko.observable(),
                nextExams: ko.observableArray([]),
                
                submit: function() {
                    window.location.href = "/quiz/" + this.quiz() + "/" + this.cmuid();
                }
            };

            ko.applyBindings(vm);
        });
});