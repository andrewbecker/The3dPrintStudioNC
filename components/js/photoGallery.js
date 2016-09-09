(function($, window) {

	var photoGallery = {
		
		config: {
			photoWidth: $('.photo_group .photo img').outerWidth(),
			galleryWidth: $('.photo_group').outerWidth(),
			maxMove: (Math.floor(this.galleryWidth/this.photoWidth)) * this.photoWidth
		},

		init: function() {
			this.bindUI();
			this.update();
		},

		bindUI: function () {
			var that = this;

			$(window).resize(function() {
				that.resizeGallery();
				that.update();
			});

			$('.fa-chevron-right').on('click', function() {
				var currentLocation = parseInt($('.photo_group ul').css('left').replace('px', ''));
				var move = (currentLocation - that.config.maxMove);

				if ( (move < (that.config.galleryWidth * -1)) || ((move - that.config.galleryWidth < ($('.photo_group ul').width()*-1))) ) {
					move = ($('.photo_group ul').width() - that.config.galleryWidth) * -1 ;
				}
				$('.photo_group ul').animate({left: move}, "slow");
			});

			$('.fa-chevron-left').on('click', function() {
				var currentLocation = parseInt($('.photo_group ul').css('left').replace('px', ''));
				var move = (currentLocation + that.config.maxMove);

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
		},

		update: function () {
			this.config.galleryWidth = $('.photo_group').outerWidth();
			this.config.maxMove = (Math.floor(this.config.galleryWidth/this.config.photoWidth)) * this.config.photoWidth;

			this.resizeGallery();
		},

		resizeGallery: function () {
			var windowWidth = $("body").prop("scrollWidth");
			if (windowWidth > 1000) {
				$('.photo_group').width(800);
			} else {
				$('.photo_group').width(windowWidth-200);
			}
		},

		resizePopout: function () {
			if ($('.photo_popout').css('display') != 'none') {
				var imageWidth = $('.photo_popout').outerWidth();
				$('.photo_popout').css('margin-top', (imageWidth/2)*-1).css('margin-left', (imageWidth/2)*-1);
			}
		},

		setOverlay: function () {
			if ($('.photo_popout').css('display') != 'none') {
				$('.shadowbox').width($('body').width()).height($('body').height());
			}
		}

	}

	photoGallery.init();

})(jQuery, window);
