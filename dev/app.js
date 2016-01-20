(function () {
	/* Dependencias*/
	const $ = require('jquery');
	const showMenu = require('./components/MainMenu');
	const showNews = require('./components/News');
	const getData  = require('./lib/getData.js');	
	const Easing   = require("jquery-easing");
	const loader = require('./components/loader');

	const url = '/news_mock.json';

	/*Listeners*/	
	document.addEventListener('DOMContentLoaded', onDOMload);
	$(document).on('ready',onReady);
	

	/*Funciones*/

	function onReady (){
		loader.showLoader();		
	}

	function firstAnimation () {
		$('.MainContent').animate({
			'top':['0','easeOutBounce']
		},
		2000, function () {
			$('.Header').css({
				'position':'fixed',
				'border-radius': 0
			});
			$('.MainContent').css({'border-radius':0});
		});
	}

	function animateNewsItems () {		
		$('.News').find('.News-item').first().show( 'fast', function showNext() {
			$( this ).next( '.News-item' ).show( 'fast', showNext );
		});
	}

	function loadContent (event) {
		event.preventDefault();
		let accion = this.getAttribute("href");
		accion = accion.split("#").pop();
		showMenu.close();
		if(accion === "home"){
			console.log('pidiendo datos');			
			getData.init(url);
			// animateNewsItems();
		}
	}

	function onDOMload() {		
		loader.hideLoader();
		firstAnimation ();
		showMenu.init();
		// getData.init();
		showNews.init();

		$('.MainMenu-list').on("click","a",loadContent);		
	}

}())