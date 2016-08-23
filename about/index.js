(function($) {

	/////////////////////////////////////////////
	// SMARTRESIZE PLUGIN
	/////////////////////////////////////////////
	
	(function($,sr){
	
		// USE STRICT
		"use strict";
		
		// debouncing function from John Hann
		// http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
		var debounce = function (func, threshold, execAsap) {
			var timeout;
			
			return function debounced () {
				var obj = this, args = arguments;
				function delayed () {
					if (!execAsap) {
						func.apply(obj, args);
						timeout = null;
					}
				}
				
				if (timeout) {
					clearTimeout(timeout);
				} else if (execAsap) {
					func.apply(obj, args);
				}
				
				timeout = setTimeout(delayed, threshold || 100); 
			};
		};
		
		// smartresize 
		jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };
	 
	})(jQuery,'smartresize');
	
	/*
	|--------------------------------------------------------------------------
	| BEGIN ESSENTIAL CUSTOM JQUERY
	|--------------------------------------------------------------------------
	*/
  
	/////////////////////////////////
	// MAIN MENU
 	/////////////////////////////////
	
	
	// MAIN MENU - RESPONSIVE
	var mobileNavToggle = jQuery('.show-menu');		
			mobileNavToggle.each(function() {
				var mobileMenu = jQuery(this).next('nav').find('ul#menu');
				var menuSelectedText = mobileMenu.find('.current-menu-item:last > a').text();
				if (menuSelectedText !== "") {
					jQuery(this).html(menuSelectedText + '<i class="fa fa-angle-down"></i>');
				}
			});

			// Toggle Mobile Nav show/hide			
			mobileNavToggle.on('click', function(e) {
				e.preventDefault();
				jQuery(this).next('nav').find('ul#menu').slideToggle(400);
			});
			
			jQuery(window).smartresize(function(){  
				if (jQuery('.container').width() > 0 || jQuery('body').hasClass('responsive-fixed')) {
					var menus = jQuery('nav').find('ul#menu');
					menus.each(function() {
						jQuery(this).css("display", "");
					});
				}
			});
			

	/*
	|--------------------------------------------------------------------------
	| END ESSENTIAL CUSTOM JQUERY
	|--------------------------------------------------------------------------
	*/
		
})(jQuery);
