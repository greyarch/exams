define(['js/libs/knockout-2.2.0.js', 'js/ajax.js'], function (ko, ajax) {
    function Test(json) {
        var self = this;
        self.id = ko.observable(json.id);
        self.title = ko.observable(json.title);
        self.tag = ko.observable(json.tag);

        self.toJSON = function () {
            return {
                id:self.id(),
                title:self.title(),
                tag:self.tag()
            }
        }

        self.delete = function (onSuccess) {
            console.log("deleting a test with id: ", self.id());
            ajax.del('/test/id/' + self.id(), onSuccess);
        }
    }

    Test.getAll = function (onSuccess) {
        console.log("getting all tests");
        ajax.get('/test', function(data) {
            var t = [];
            _.map(data, function (item) {
                t.push(new Test(item));
            });
            onSuccess(t);
        });
    }

    return Test;
});