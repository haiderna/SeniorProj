//http://phantomjs.org/screen-capture.html

var page = require('webpage').create();
page.open('http://google.com/', function() {
  page.render('github.png');
  phantom.exit();
});