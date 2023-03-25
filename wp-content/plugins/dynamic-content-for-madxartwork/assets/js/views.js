(function ($) {
    var WidgetElements_ViewsHandler = function ($scope, $) {

		var id_scope = $scope.attr('data-id');
		var elementSettings = get_Dyncontel_ElementSettings($scope);
		var elementSwiper = '.madxartwork-element-' + id_scope + ' .swiper-container';
		var speed = elementSettings.transition_speed;
		var disableOnInteraction = Boolean( elementSettings.pause_on_interaction ) || false;
		var loop = false;

		if ( 'yes' === elementSettings.infinite) {
			loop = true;
		}
        
		var id_post = $scope.attr('data-post-id');
		var madxartworkBreakpoints = madxartworkFrontend.config.breakpoints;
		
		var viewsSwiperOptions = {
			autoHeight: true,
			speed: speed,
			loop: loop,
		};

		// Responsive Parameters
		var spaceBetween = 0;

		if (elementSettings.spaceBetween) {
			spaceBetween = elementSettings.spaceBetween;
		}

		var responsivePoints = viewsSwiperOptions.breakpoints = {};
		responsivePoints[madxartworkBreakpoints.lg] = {
			slidesPerView: Number(elementSettings.slides_to_show) || 'auto',
			slidesPerGroup: Number(elementSettings.slides_to_scroll) || 1,
			spaceBetween: Number(spaceBetween) || 0,
		};

		var spaceBetween_tablet = spaceBetween;
		if (elementSettings.spaceBetween_tablet) {
			spaceBetween_tablet = elementSettings.spaceBetween_tablet;
		}
		responsivePoints[madxartworkBreakpoints.md] = {
			slidesPerView: Number(elementSettings.slides_to_show_tablet) || Number(elementSettings.slides_to_show) || 'auto',
			slidesPerGroup: Number(elementSettings.sslides_to_scroll_tablet) || Number(elementSettings.slides_to_scroll) || 1,
			spaceBetween: Number(spaceBetween_tablet) || 0,
		};

		var spaceBetween_mobile = spaceBetween_tablet;
		if (elementSettings.spaceBetween_mobile) {
			spaceBetween_mobile = elementSettings.spaceBetween_mobile;
		}
		responsivePoints[madxartworkBreakpoints.xs] = {
			slidesPerView: Number(elementSettings.slides_to_show_mobile) || Number(elementSettings.slides_to_show_tablet) || Number(elementSettings.slidesPerView) || 'auto',
			slidesPerGroup: Number(elementSettings.slides_to_scroll_mobile) || Number(elementSettings.slides_to_scroll_tablet) || Number(elementSettings.slidesPerGroup) || 1,
			spaceBetween: Number(spaceBetween_mobile) || 0,
		};
		viewsSwiperOptions = $.extend(viewsSwiperOptions, responsivePoints);

		// Navigation
		if (elementSettings.navigation != 'none') {
			
			if ( elementSettings.navigation == 'both' || elementSettings.navigation == 'arrows' ) {
				viewsSwiperOptions = $.extend(viewsSwiperOptions, {
					navigation: {
						nextEl: id_post ? '.madxartwork-element-' + id_scope + '[data-post-id="' + id_post + '"] .madxartwork-swiper-button-next' : '.madxartwork-swiper-button-next',
						prevEl: id_post ? '.madxartwork-element-' + id_scope + '[data-post-id="' + id_post + '"] .madxartwork-swiper-button-prev' : '.madxartwork-swiper-button-prev',
					},
				});
			}

			if ( elementSettings.navigation == 'both' || elementSettings.navigation == 'dots' ) {
				viewsSwiperOptions = $.extend(viewsSwiperOptions, {
					pagination: {
						el: id_post ? '.madxartwork-element-' + id_scope + '[data-post-id="' + id_post + '"] .swiper-pagination' : '.swiper-pagination',
						type: 'bullets',
						clickable: true,
					},
				});
			}
		}

		// Autoplay
		if ( elementSettings.autoplay ) {
			viewsSwiperOptions = $.extend(viewsSwiperOptions, {
				autoplay: {
					autoplay: true,
					delay: elementSettings.autoplay_speed,
					disableOnInteraction: disableOnInteraction,
				}
			});
		}

		// Instance
		if ( 'undefined' === typeof Swiper ) {
			const asyncSwiper = madxartworkFrontend.utils.swiper;

			new asyncSwiper( elementSwiper, viewsSwiperOptions ).then( ( newSwiperInstance ) => {
				viewsSwiper = newSwiperInstance;
			} );
		} else {
			viewsSwiper = new Swiper( elementSwiper, viewsSwiperOptions );
		}
		
		// Pause on hover
		if ( elementSettings.autoplay && elementSettings.pause_on_hover ) {
			$(elementSwiper).on({
				mouseenter: function () {
					viewsSwiper.autoplay.stop();
				},
				mouseleave: function () {
					viewsSwiper.autoplay.start();
				}
			});
		}
		
    };

    // Make sure you run this code under madxartwork..
    $(window).on('madxartwork/frontend/init', function () {
        madxartworkFrontend.hooks.addAction('frontend/element_ready/dce-views.default', WidgetElements_ViewsHandler);
    });
})(jQuery);
