$(document).ready(function(){

	// Tooltips
  // ======================
	$("[data-toggle='tooltip']").tooltip({
		container:"body"
	});


	// Popovers
  // ======================
	$("[data-toggle='popover']").popover();


	// Sticky Sections
  // ======================
  if ($.fn.sticky) {
		$('section[data-fixed="true"]').sticky({ topSpacing: $('#header')
		.outerHeight(), zIndex: 1039 })
		.on('sticky-start', function() { $('#header').addClass('no-shadow'); })
		.on('sticky-end', function() { $('#header').removeClass('no-shadow'); });
  }

	$(window).resize(function() {
    $('.sticky-wrapper').each(function() {
      $(this).css('min-height', $(this).children().outerHeight() );
    });
  });


	// Fixed Navigation
  // ======================
	$(window).scroll(function(){
  	if ($(this).scrollTop() > 40) {
    	$('body').addClass('header-scroll');
    } else {
			$('body').removeClass('header-scroll');
    }
  });


	// Responsive Navbar
  // ======================
	// Toggle Navbar
	$(".navbar-toggle").click(function () {
		$('body').toggleClass('navbar-open');
		return false;
	});

	// Nav Responsive
	$('#header .navbar-left .nav').clone().prependTo("body").addClass('nav-responsive');

	// Nav Responsive
	$('.nav-responsive .has-dropdown > a').click(function() {
		$(this).parent().toggleClass('open');
		return false;
	});


	// Search Bar
  // ======================
	// Toggle Search
	$("[data-toggle='search']").click(function () {
		$('body').toggleClass('navbar-search-open');
		return false;
	});

	// Close Search
	$(".navbar-search .close").click(function () {
		$('body').removeClass('navbar-search-open');
		return false;
	});


	// Nav Dropdown Open
	// ======================
	$('#header .has-dropdown').hover(function() {
		$(this).addClass('open');
	}, function() {
		$(this).removeClass('open');
	});


	// Progress Bars
  // ======================
	setTimeout(function(){
		$('.progress-loaded .progress-bar').each(function() {
			var me = $(this);
			var perc = me.attr("aria-valuenow");
			var current_perc = 0;
			var progress = setInterval(function() {
				if (current_perc>=perc) {
					clearInterval(progress);
				} else {
					current_perc +=1;
					me.css('width', (current_perc)+'%');
				}
			}, 0);
		});
	},0);


	// Carousel
  // ======================
	// Ken Burns effect
	$('.item-active').removeClass('item-active');

	// Animated Carousel
	function slideranimation( elems ) {
		var animEndEv = 'webkitAnimationEnd animationend';
		elems.each(function () {
			var $this = $(this),
			$animationType = $this.data('animation');
			$this.addClass($animationType).one(animEndEv, function () {
				$this.removeClass($animationType);
			});
		});
	}
	var $fullCarousel = $('.carousel-animated'),
	$firstAnimatingElems = $fullCarousel.find('.item:first').find("[data-animation ^= 'animated']");
	slideranimation($firstAnimatingElems);
	$fullCarousel.carousel('pause');

	$fullCarousel.on('slide.bs.carousel', function (e) {
		var $animatingElems = $(e.relatedTarget).find("[data-animation ^= 'animated']");
		slideranimation($animatingElems);
	});

	// Full Height
	$('.full-height .carousel-item').each(function () {
		$(this).css('height', $(window).height()  - $('header').outerHeight() );
  });

	$(window).resize(function () {
    $('.full-height .carousel-item').each(function () {
			$(this).css('height', $(window).height()  - $('header').outerHeight() );
    });
  });


	// Embed Player
  // ======================
	$(".embed-responsive i").click(function() {
		$(this).parent().find('.video-play-icon').fadeOut("slow");
    $(this).parent().parent().find('.video-caption').fadeOut("slow");
		$(this).parent().parent().find('img').fadeOut("slow");
    $(this).parent().parent().parent().addClass('played');
		var id = $(this).parent().parent().parent().data("src");
    $(this).parent().append('<iframe src="' + id + '" allowfullscreen></iframe>');
  });


	// Model Animation
  // ======================
	$('.modal').on('shown.bs.modal', function (e) {
		var effect  = $(this).data("effect");
		if(effect) {
			$(this).find('.modal-content').addClass('animated ' + effect + '');
		}
	});

	$('.modal').on('hidden.bs.modal', function (e) {
		var effect  = $(this).data("effect");
		if(effect) {
			$(this).find('.modal-content').removeClass('animated ' + effect + '');
		}
	});

	$(".modal-sample").on( "click", function() {
		var effect  = $('#modal-animation').val();
		var modal='<div class="modal myModalSample" tabindex="-1" role="dialog" aria-labelledby="myModalSample" aria-hidden="true"><div class="modal-dialog"><div class="modal-content  animated ' + effect + '"><div class="modal-header"><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button><h4 class="modal-title" id="myModalSampleLabel">'+ effect +' modal effect</h4></div><div class="modal-body">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nec mattis odio. In hac habitasse platea dictumst.</div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Close</button><button type="button" class="btn btn-primary">Save changes</button></div></div></div></div>';
		$('.modal-sample').after( modal );
		$('.myModalSample').on('hidden.bs.modal', function (e) {
			$(this).remove( );
		});
  });

	$('.modal').on('show.bs.modal', function() {
	  $(this).show();
	  setModalMaxHeight(this);
	});

	$(window).resize(function() {
	  if ($('.modal.in').length != 0) {
	    setModalMaxHeight($('.modal.in'));
	  }
	});


	// Check All
	// ======================
	$(".table thead input:checkbox").click(function(){
    $('input:checkbox').not(this).prop('checked', this.checked);
	});
})(window.jQuery);

function setModalMaxHeight(element) {
	this.$element     = $(element);
	this.$content     = this.$element.find('.modal-content');
	var borderWidth   = this.$content.outerHeight() - this.$content.innerHeight();
	var dialogMargin  = $(window).width() < 768 ? 20 : 60;
	var contentHeight = $(window).height() - (dialogMargin + borderWidth);
	var headerHeight  = this.$element.find('.modal-header').outerHeight() || 0;
	var footerHeight  = this.$element.find('.modal-footer').outerHeight() || 0;
	var maxHeight     = contentHeight - (headerHeight + footerHeight);

	this.$content.css({
			'overflow': 'hidden'
	});

	this.$element
		.find('.modal-body').css({
			'max-height': maxHeight,
			'overflow-y': 'auto'
	});
}
