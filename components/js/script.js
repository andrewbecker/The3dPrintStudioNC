//Refresh video feeds
var TIMEOUT = 30000;
var refreshInterval = setInterval(function() {
  var random = Math.floor(Math.random() * Math.pow(2, 31));
  $('img#js-rostockcamera').attr('src', 'http://octoprintrecipes.dyndns.org:8080/webcam/?action=stream&' + random);
  $('img#js-prusacamera').attr('src', 'http://octoprintrecipes.dyndns.org:8081/webcam/?action=stream&' + random);
}, TIMEOUT); 


// Mobile navigation
$('.nav_collapse').on('click', function() {
	if ($(this).hasClass('close')) {
		$('.nav_right').show();
		$('.hero').animate({
			marginTop: 144
		}, 500);
		$(this).removeClass('close');
	} else {
		$('.hero').animate({
			marginTop: 0
		}, 500);
		$('.hero').promise().done(function() {
			$('.nav_right').hide();
		});
		$(this).addClass('close');
	}
});

$(window).resize(function() {
	if (window.innerWidth > 700) {
		$('.hero').css("margin-top", "0");
		$('.nav_collapse').addClass('close');
		$('.nav_right').show();
	}
});

// Etsy Script
var setupEtsyShop = function() {
	var width = window.innerWidth;
	console.log(width);
	$etsy_frame_container = $('.etsy_frame_container');

	if (width < 600) {
		// $('.etsy_frame_container').html("<script type='text/javascript' src='https://www.etsy.com/assets/js/etsy_mini_shop.js'></script><script type='text/javascript'>new Etsy.Mini(13155503,'gallery',2,5,1,'https://www.etsy.com');</script>");
		// $('.etsy_frame_container').html("test");
	}
}();

