(function(jQuery) {
	jQuery.fn.clickoutside = function(callback) {
		var outside = 1, self = jQuery(this);
		self.cb = callback;
		this.click(function() { 
			outside = 0; 
		}); 
		jQuery(document).click(function(event){
			if(event.button == 0)
			{
				outside && self.cb();
				outside = 1;
			}
		});
		return jQuery(this);
	}
})(jQuery);

jQuery(document).ready(function() {
		
		
 		
		<!--view more top menu-->
		jQuery('#hasmore').toggle(
			function(){				
				jQuery('#subtop').slideDown(300);
				jQuery(this).addClass('over');
				jQuery(this).parent().addClass('start');
			},
			function(){
				jQuery('#subtop').slideUp(300);
				jQuery(this).removeClass('over');
				jQuery(this).parent().removeClass('start');
			}
		);
		
		jQuery('#subtop').hover(function(){
		    jQuery('#hasmore').addClass('over');
		},function(){
		   jQuery('#subtop').slideUp(300);   
		});
		
		jQuery('#top_page .mynaviga li.tk a').click(function(){
		jQuery(this).next().slideToggle(0, function(){
		    if(jQuery(this).is(':hidden'))
		    {
			jQuery(this).prev().removeClass('active');
		    }
		    else
		    {
			jQuery(this).prev().addClass('active');
		    }
		   
		});
		  
	    });
	    
	    jQuery('#top_page .mynaviga li.tk a').clickoutside(function(){
		if(jQuery(this).next().css('display') == 'block'){
		    jQuery(this).removeClass('active');
		    jQuery(this).next().hide();
		}
	    });
	    
});		    