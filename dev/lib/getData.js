var getData = (function () {
	/* Dependencias*/
	const $ = require('jquery');
	const loader = require('../components/loader');
	// const Easing = require('jquery-easing');
	const showNews = require('../components/News');	

	// const news_template = require('../components/News-item/template.jade');

	function getJson (url) {

		$.ajax({
			url: url,
			beforeSend: function(){
				loader.showLoader();
			},			
			success: function(datos){
				/*Convertimos los datos a string*/
				let cache = JSON.stringify(datos);
				/*almacenamos los datos en cache*/
				localStorage[url] = cache;
				showNews.renderNews(datos);
			}
		});
	}

	function cache (url) {
		/*Comprobamos si está en cache*/
		if(localStorage[url]){
			let datos = localStorage[url];
			/*Convertimos el string a JSON*/
			datos = JSON.parse(datos);
			//render
			showNews.renderNews(datos);			
		}else{
			// peticion
			getJson(url);
			
			
			//render
		}
	}

	// function renderNews(datos){
	// 	loader.hideLoader();
	// 	console.log(datos);
	// 	let contenido_html = '';
	// 	for(var i=0; i< datos.length; i++){
	// 		contenido_html += news_template(datos[i]);
	// 	}
	// 	$(contenido_html).find('.News-itemFull').css('display','none');
	// 	// alert("Dato: " + JSON.stringify(datos));
	// 	$('.News').html(contenido_html);
	// 	$('.News').find('.News-itemFull').css('display','none');
	// 	animateNewsItems();
	// }

	// function animateNewsItems () {		
	// 	$('.News').find('.News-item').first().show( 600,'easeOutBounce', function showNext() {
	// 		$( this ).next( '.News-item' ).show( 600,'easeOutBounce', showNext );
	// 	});
	// }


	return {
		init : function (url) {
			cache(url);
		}
	};

})();

module.exports = getData;