export default function useAction() {
	return {
		backToDashboard: () => {
			if ( window.top === window ) {
				window.top.location = madxartworkAppConfig.admin_url;
			} else {
				// Iframe.
				window.top.$e.run( 'app/close' );
			}
		},
		backToReferrer: () => {
			if ( window.top === window ) {
				// Directly - in case that the return_url is the login-page, the target should be the admin-page and not the login-page again.
				window.top.location = madxartworkAppConfig.return_url.includes( madxartworkAppConfig.login_url ) ? madxartworkAppConfig.admin_url : madxartworkAppConfig.return_url;
			} else {
				// Iframe.
				window.top.$e.run( 'app/close' );
			}
		},
	};
}
