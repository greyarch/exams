ko.extenders.liveEditor = function (target) {
    target.editing = ko.observable(false);

    target.edit = function () {
        target.editing(true);
    };

    target.stopEditing = function () {
        target.editing(false);
    };
    return target;
};

ko.bindingHandlers.liveEditor = {
    init: function (element, valueAccessor) {
        var observable = valueAccessor();
        observable.extend({ liveEditor: this });
    },
    update: function (element, valueAccessor) {
        var observable = valueAccessor();
        ko.bindingHandlers.css.update(element, function () { return { editing: observable.editing }; });
    }
};