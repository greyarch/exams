var _ = require('lodash');

module.exports = function (hbs) {

    hbs.registerHelper("debug", function (optionalValue) {
        console.log("Current Context");
        console.log("====================");
        console.log(this);

        if (optionalValue) {
            console.log("Value");
            console.log("====================");
            console.log(optionalValue);
        }
    });

    hbs.registerHelper('ifContains', function (coll, item, options) {
        if (_.contains(coll, item)) {
            return options.fn(this);
        }
    });

    hbs.registerHelper('ifEquals', function (first, second, options) {
        if (first === second) return options.fn(this);
    });
};

