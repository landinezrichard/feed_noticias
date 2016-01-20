(function () {
	/* Dependencias*/
	const $ = require('jquery');
	const showMenu = require('./components/MainMenu');
	const showNews = require('./components/News');
	const getData  = require('./lib/getData.js');
	// const Easing   = require('./lib/jquery_easing-1-3.js');
	const Easing   = require("jquery-easing");
	// const renderNews = require('./lib/renderNews.js');

	document.addEventListener('DOMContentLoaded', onDOMload);

	$(document).on('ready',onReady);

	function onReady (){
		//eliminamos el scroll de la pagina
		$('body').css({'overflow-y':'hidden'});		
	}

	function firstAnimation () {
		$('.MainContent').animate({
			'top':['0','easeOutBounce']
		},
		2000, function () {
			$('.Header').css({'position':'fixed'});
			// $('.MainContent').css({'margin-top':'2.3rem'});
		});
	}

	function onDOMload() {
		$('.Loader-container').fadeOut(1000,function(){
			//eliminamos la capa de precarga
			$(this).remove();
			//permitimos scroll
			$('body').css({'overflow-y':'auto'});
		});

		firstAnimation ();
		showMenu.init();
		getData.init();
		showNews.init();
		// renderNews.init();
	}

}())