$(function(){
	'use strict';

	// preloader
	$(".preloader").fadeOut();

	// sidebar
	$('.sidebar').sideNav();

	$('.sidebar-search').sideNav({
		edge: 'right'
	});
    
	// slider
	$(".slide-show").owlCarousel({
		items: 1,
		navigation: true,
		slideSpeed: 1000,
		dots: true,
		smartSpeed: 700,
		paginationSpeed: 400,
		singleItem: true,
		autoplay: true,
		loop: true
	});

	// tabs
	$('ul.tabs').tabs();

	// collapse
	$('.collapsible').collapsible();


	$('.dropdown-button').dropdown({
		inDuration: 300,
		outDuration: 225,
		constrainWidth: false, // Does not change width of dropdown to that of the activator
		hover: false, // Activate on hover
		gutter: 0, // Spacing from edge
		belowOrigin: true, // Displays dropdown below the button
		alignment: 'left', // Displays dropdown with edge aligned to the left of button
		stopPropagation: false // Stops event propagation
		
		}
	);

});