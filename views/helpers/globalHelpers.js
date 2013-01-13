module.exports = function (hbs) {

	hbs.registerHelper("debug", function(optionalValue) {
	  console.log("Current Context");
	  console.log("====================");
	  console.log(this);

	  if (optionalValue) {
	    console.log("Value");
	    console.log("====================");
	    console.log(optionalValue);
	  } 
	});

	hbs.registerHelper('isAdminUser', function(options) {
	  if(this.user.role=="admin") {
	    return options.fn(this);
	  }
	});

};

