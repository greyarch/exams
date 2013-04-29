define(['knockout'], function (ko) {
    ko.extenders.persist = function (target, option) {
        target.subscribe(function (newValue) {
            store.set(option, newValue);
        });
        return target;
    };
});