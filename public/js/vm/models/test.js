define('models/test', ['js/libs/knockout-2.2.0.js'], function (ko) {
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
            $.ajax({
                url:"/test/id/" + self.id(),
                type:"DELETE",
                success:onSuccess,
                error:function (jqXhr) {
                    console.log("error while trying to delete Test: " + jqXhr.responseText);
                }
            });
        }
    }

    Test.getAll = function (onSuccess) {
        console.log("getting all tests");
        $.getJSON('/test', onSuccess);
    }

    return Test;
});