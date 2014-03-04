
jQuery(document).ready(function(){


	/* ---- Countdown timer ---- */

	/*jQuery('#counter').countdown({
		timestamp : (new Date()).getTime() + 24*60*60*1000
	});*/


	/* ---- Animations ---- */

	jQuery('#links a').hover(
		function(){ jQuery(this).animate({ left: 3 }, 'fast'); },
		function(){ jQuery(this).animate({ left: 0 }, 'fast'); }
	);

	jQuery('footer a').hover(
		function(){ jQuery(this).animate({ top: 3 }, 'fast'); },
		function(){ jQuery(this).animate({ top: 0 }, 'fast'); }
	);


	/* ---- Using Modernizr to check if the "required" and "placeholder" attributes are supported ---- */
/*
	if (!Modernizr.input.placeholder) {
		jQuery('.email').val('Input your e-mail address here...');
		jQuery('.email').focus(function() {
			if(jQuery(this).val() == 'Input your e-mail address here...') {
				jQuery(this).val('');
			}
		});
	}

	// for detecting if the browser is Safari
	var browser = navigator.userAgent.toLowerCase();

	if(!Modernizr.input.required || (browser.indexOf("safari") != -1 && browser.indexOf("chrome") == -1)) {
		jQuery('form').submit(function() {
			jQuery('.popup').remove();
			if(!jQuery('.email').val() || jQuery('.email').val() == 'Input your e-mail address here...') {
				jQuery('form').append('<p class="popup">Please fill out this field.</p>');
				jQuery('.email').focus();
				return false;
			}
		});
		jQuery('.email').keydown(function() {
			jQuery('.popup').remove();
		});
		jQuery('.email').blur(function() {
			jQuery('.popup').remove();
		});
	}
	*/


});

