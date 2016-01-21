(function () {
	/* Dependencias*/
	const $ = require('jquery');
	const showMenu = require('./components/MainMenu');
	const showNews = require('./components/News');
	const getData  = require('./lib/getData.js');
	const Easing   = require('jquery-easing');
	const loader = require('./components/loader');
/*
*	Para pedir los datos a la api, 
	cambiar el valor de la url aquí:
*/
	const url = '/news_mock.json';

	/*
	Este valor no cambiarlo, 
	es para obtener los datos del archivo JSON
	*/
	const url1 = '/news_mock.json';

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

	function loadContent (event) {
		event.preventDefault();
		let accion = this.getAttribute("href");
		accion = accion.split("#").pop();
		showMenu.close();

		if(accion === "noticias"){
			console.log('pidiendo datos');
			getData.init(url);
		}
		else{
			//pedimos datos al JSON
			getData.init(url1);
		}
	}

	function onDOMload() {
		loader.hideLoader();
		firstAnimation ();
		showMenu.init();
		showNews.init();

		$('.MainMenu-list').on("click","a",loadContent);
	}

}())