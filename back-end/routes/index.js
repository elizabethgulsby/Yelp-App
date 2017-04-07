var express = require('express');
var router = express.Router();
var request = require('request');
var Yelp = require('yelpv3');

var yelp = new Yelp({
	app_id: 'pc7p-LIX3Dx1lqZDCOtC-w',
  	app_secret: 'Q1tdc0e1IN6gaHHkrCYGt0x4bhd2kHbLgwZy9tqqcgU7ztvnJBDGIhZdsv7292dK'
});

/* GET home page.  The code here is identical to the code in the post request; ejs will render whatever is parsed into res.render into index.js, and a console.log here will never resolve the home page. */
router.get('/', function(req, res, next) {
	var searchTerm = req.body.search;
yelp.search({term: searchTerm, location: '30308', limit: 10})
	.then(function (data) {
		// var data = JSON.stringify(data)
		data = JSON.parse(data);
	    console.log(data);
	    res.render('index', {
			data: data
		})
	})
	.catch(function (err) {
	    console.error(err);
	});
	
})

// Get search results from post request - at present, is returning only restaurants (desired effect), but is returning restaurants that do not include search term (ex: 'gas' returns results for ROOM at Twelve, Empire State South, Bezoria, etc)
router.post('/search', function(req, res, next) {
	var searchTerm = req.body.search;
	yelp.search({term: searchTerm, location: '30308', categories: 'restaurants'})
		.then(function (data) {
			// var data = JSON.stringify(data)
			console.log("Has it errored yet?");
			data = JSON.parse(data);
		    console.log(data);
		    res.render('index', {
				data: data
			})
		})
		.catch(function (err) {
		    console.error(err);
		});
})

module.exports = router;
