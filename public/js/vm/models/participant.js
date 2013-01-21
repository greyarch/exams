define('models/participant', ['js/libs/knockout-2.2.0.js'], function (ko) {
    function Participant(json) {
        var self = this;
        json = json || {};
        self.id = ko.observable(json.id);
        self.company = ko.observable(json.company);
        self.firstName = ko.observable(json.first_name);
        self.lastName = ko.observable(json.last_name);
        self.email = ko.observable(json.email);
        self.price = ko.observable(json.price);
        self.fee = ko.observable(json.fee);
        self.result = ko.observable(json.result);
        self.pass = ko.observable(json.pass || false);

        self.passStyle = ko.computed(function () {
            return self.pass() ? 'icon-tick glossy green-gradient' : 'icon-cross glossy red-gradient';
        });

        self.toJSON = function () {
            return {
                id:self.id(),
                company:self.company(),
                first_name:self.firstName(),
                last_name:self.lastName(),
                email:self.email(),
                price:self.price(),
                fee:self.fee(),
                result:self.result(),
                pass:self.pass()?1:0
            }
        }
    }

    Participant.save = function (examId, json, onSuccess) {
        console.log("saving a participant", json);
        if (examId) {
            if (json.id) {
                console.log("updating participant", json);
                $.ajax({
                    type:'PUT',
                    url:'/participant/id/' + json.id,
                    data:json,
                    success:onSuccess
                }, "json");
            } else {
                $.post("/exam/id/" + examId + "/participant", json, onSuccess);
            }
        } else {
            console.error('currently, it is not possible create participants without an exam!');
        }
    }

    Participant.remove = function (partId, onSuccess) {
        console.log("deleting exam with id: ", partId);
        $.ajax({
            url:"/participant/id/" + partId,
            type:"DELETE",
            success:onSuccess,
            error:function (jqXhr) {
                console.log("error while trying to delete participant: " + jqXhr.responseText);
            }
        });
    }

    return Participant;
});