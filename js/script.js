function resizeGallery() {
	var windowWidth = $("body").prop("scrollWidth");
	if (windowWidth > 1000) {
		$('.photo_group').width(800);
	} else {
		$('.photo_group').width(windowWidth-200);
	}
}

resizeGallery();

//Refresh video feeds
var TIMEOUT = 5000;
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
	resizeGallery();
	sizePopout();
	setOverlay();
	if (window.innerWidth > 700) {
		$('.hero').css("margin-top", "0");
		$('.nav_collapse').addClass('close');
		$('.nav_right').show();
	}
});

// Photo popup
$('.photo_popout .photo_container .close_btn').on('click', function(e) {
	e.stopPropagation();
	$(this).parent().parent().hide('fast');
	$('.shadowbox').hide();
});

$('.photo_gallery .photos .photo').on('click', function(e) {
	e.stopPropagation();
	var image = $(this).children('img').attr('src');
	var imageWidth = $('.photo_popout').outerWidth();
	$('.photo_popout .photo_container img').attr('src', image);
	$('.shadowbox').width($('body').width()).height($('body').height()).show();
	$('.photo_popout').css('margin-top', (imageWidth/2)*-1).css('margin-left', (imageWidth/2)*-1);
	$('.photo_popout').show('fast');
});

function sizePopout() {
	if ($('.photo_popout').css('display') != 'none') {
		var imageWidth = $('.photo_popout').outerWidth();
		$('.photo_popout').css('margin-top', (imageWidth/2)*-1).css('margin-left', (imageWidth/2)*-1);
	}
}

function setOverlay() {
	if ($('.photo_popout').css('display') != 'none') {
		$('.shadowbox').width($('body').width()).height($('body').height());
	}
}

// If an event gets to the body
$(".shadowbox").click(function(e){
  $(".photo_popout").hide('fast');
  $('.shadowbox').hide();
});

/*******   Photo gallery   ********/

// Note (need to change left value to match the amout moved)
// see recipe website

(function() {

	var photoWidth = $('.photo_group .photo img').outerWidth();
	var galleryWidth = $('.photo_group').outerWidth();
	var maxMove = (Math.floor(galleryWidth/photoWidth)) * photoWidth;
	// console.log(maxMove);
	// console.log(galleryWidth);


	$('.fa-chevron-right').on('click', function() {
		var currentLocation = parseInt($('.photo_group ul').css('left').replace('px', ''));
		var move = (currentLocation - maxMove);
		// console.log('move: ' + move);
		// console.log('galleryWidth: ' + galleryWidth);
		// console.log('ul length' + $('.photo_group ul').width());
		// console.log((move - galleryWidth))
		// console.log(($('.photo_group ul').width()*-1));

		if ( (move < (galleryWidth * -1)) || ((move - galleryWidth < ($('.photo_group ul').width()*-1))) ) {
			move = ($('.photo_group ul').width() - galleryWidth) * -1 ;
		}
		$('.photo_group ul').animate({left: move}, "slow");
	});

	$('.fa-chevron-left').on('click', function() {
		var currentLocation = parseInt($('.photo_group ul').css('left').replace('px', ''));
		var move = (currentLocation + maxMove);

		if (move > 0) {
			move = 0;
		}
		$('.photo_group ul').animate({left: move}, "slow");

	});


})();


