( function( $ ) {
	var WidgetElements_TooltipHandler = function( $scope, $ ) {
		var elementSettings = get_Dyncontel_ElementSettings( $scope );

		if( elementSettings.dce_enable_tooltip ) {

			var deviceMode = $( 'body' ).attr( 'data-madxartwork-device-mode' );

			// Set max width
			var maxWidth = parseInt ( elementSettings.dce_tooltip_max_width.size ) || 200;
			if ( deviceMode == 'tablet' ) {
				maxWidth = parseInt ( elementSettings.dce_tooltip_max_width_tablet.size ) || 200;
			} else if ( deviceMode == 'mobile' ) {
				maxWidth = parseInt ( elementSettings.dce_tooltip_max_width_mobile.size ) || 200;
			}
			var selector = '';

			switch( $scope.data('widget_type') ) {
				case 'button.default' :
				case 'dce_pdf_button.default' :
				case 'dce_add_to_calendar.default' :
				case 'paypal-button.default' :
					selector = '.madxartwork-button';
					break;
				case 'button.default' :
					selector = 'image';
					break;
				case 'icon.default' :
					selector = '.madxartwork-icon';
					break;
				case 'video.default' :
					selector = '.madxartwork-wrapper';
					break;
				default:
					selector = '';
			}

			var target = $scope;
			if ( selector ) {
				target = $scope.find(selector);
			}
			if (target.length) {
				target = target.toArray();
			} else {
				console.error('Dynamic.ooo Tooltip: Selector not found');
				return;
			}

			// Set arrow
			var arrow = Boolean(elementSettings.dce_tooltip_arrow) || false;

			// Set follow cursor
			var followCursor = false;
			switch( elementSettings.dce_tooltip_follow_cursor ) {
				case 'false' :
					followCursor = false;
					break;
				case 'true' :
					followCursor = true;
					break;
				case 'horizontal' :
					followCursor = 'horizontal';
					break;
				case 'vertical' :
					followCursor = 'vertical';
					break;
				case 'initial' :
					followCursor = 'initial';
					break;
			}

			if( elementSettings.dce_tooltip_content ) {
				tippy( target, {
					content: elementSettings.dce_tooltip_content,
					arrow: arrow,
					allowHTML: true,
					followCursor: followCursor,
					maxWidth: maxWidth,
					theme: 'theme_' + $scope.data('id'),
					zIndex: parseInt(elementSettings.dce_tooltip_zindex),
				});
			}
		}
	};

	// Make sure you run this code under madxartwork..
	$( window ).on( 'madxartwork/frontend/init', function() {
		madxartworkFrontend.hooks.addAction( 'frontend/element_ready/global', WidgetElements_TooltipHandler );
	} );
} )( jQuery );
