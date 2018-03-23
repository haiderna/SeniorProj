var page = require('webpage').create();
page.open('localhost:1337', function() {
	setTimeout(function() {
	  page.render('localhost.png');
	  phantom.exit();
	}, 9000);
});