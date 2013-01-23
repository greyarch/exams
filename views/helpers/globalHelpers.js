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

	hbs.registerHelper('showMenu', function(options) {
	  var out = "<ul class=\"big-menu\">";
	  var menu = this.menu;
	
	  for(var i=0, j=menu.length; i<j; i++) {
		if (menu[i].accesslevel<4 || this.user.role == "admin"){
			if(menu[i].url == this.link) {
	    		out = out + "<li><a href=\"#\" class=\"current navigable-current\">" + menu[i].title + "</a></li>";
	    	} else {
	    		out = out + "<li><a href=\"" + menu[i].url + "\">" + menu[i].title + "</a></li>";
	    	}
	   	}
	  }
	  out += "</ul>";
	  return out;
	});

};

