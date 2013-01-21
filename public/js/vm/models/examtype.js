define('models/examtype', ['js/libs/knockout-2.2.0.js'], function (ko) {
    function ExamType(json) {
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
            console.log("deleting Exam Type with id: ", self.id());
            $.ajax({
                url:"/examtype/id/" + self.id(),
                type:"DELETE",
                success:onSuccess,
                error:function (jqXhr) {
                    console.log("error while trying to delete Exam Type: " + jqXhr.responseText);
                }
            });
        }
    }

    ExamType.getAll = function (onSuccess) {
        console.log("getting all exam types");
        $.getJSON('/examtype', onSuccess);
    }

    return ExamType;
});