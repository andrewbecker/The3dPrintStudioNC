// (function() {

// 	(function($, window) {

// 		var config = {
// 			maxWidth: 1000,

// 		}

// 	})(jQuery, window);

// })();


(function($, window) {

	var photoWidth = $('.photo_group .photo img').outerWidth();
	var galleryWidth = $('.photo_group').outerWidth();
	var maxMove = (Math.floor(galleryWidth/photoWidth)) * photoWidth;

	var resizeGallery = function() {
		var windowWidth = $("body").prop("scrollWidth");
		if (windowWidth > 1000) {
			$('.photo_group').width(800);
		} else {
			$('.photo_group').width(windowWidth-200);
		}
	}

	var updateValues = function() {
		galleryWidth = $('.photo_group').outerWidth();
		maxMove = (Math.floor(galleryWidth/photoWidth)) * photoWidth;
	}

	$(window).resize(function() {
		resizeGallery();
		updateValues();
	});

	resizeGallery();
	updateValues();

	var sizePopout = function() {	
		if ($('.photo_popout').css('display') != 'none') {
			var imageWidth = $('.photo_popout').outerWidth();
			$('.photo_popout').css('margin-top', (imageWidth/2)*-1).css('margin-left', (imageWidth/2)*-1);
		}
	}

	var setOverlay = function() {
		if ($('.photo_popout').css('display') != 'none') {
			$('.shadowbox').width($('body').width()).height($('body').height());
		}
	}

	$('.fa-chevron-right').on('click', function() {
		var currentLocation = parseInt($('.photo_group ul').css('left').replace('px', ''));
		var move = (currentLocation - maxMove);

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

	$(".shadowbox").click(function(e){
	  $(".photo_popout").hide('fast');
	  $('.shadowbox').hide();
	});

})(jQuery, window);
