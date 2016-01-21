var showNews = (function () {
	/* Dependencias*/
	const $ = require('jquery');
	const Easing = require('jquery-easing');
	const news_template = require('../News-item/template.jade');
	const loader = require('../loader');

	/*variables*/	
	let newsItem   = $('.News-itemFull'); 
	const newsList = $('.News');	

	function suscribeEvents () {
		newsItem.css('display','none');
		
		// $('.News-itemLight').on('click', function () {
		newsList.on('click','.News-itemLight', function () {
			if($(this).next().is(':visible')){
				$(this).next().slideUp();
			}
			if($(this).next().is(':hidden')){
				$('.News-itemLight').next().slideUp();
				$(this).next().slideDown();
			}
		});

	}

	function renderNews(datos){
		loader.hideLoader();
		
		let contenido_html = '';
		for(var i=0; i< datos.length; i++){
			contenido_html += news_template(datos[i]);
		}
		// $(contenido_html).find('.News-itemFull').css('display','none');
		
		$('.News').html(contenido_html);
		$('.News').find('.News-itemFull').css('display','none');
		animateNewsItems();
	}

	function animateNewsItems () {		
		$('.News').find('.News-item').first().show( 600,'easeOutBounce', function showNext() {
			$( this ).next( '.News-item' ).show( 600,'easeOutBounce', showNext );
		});
	}

	return {
		init : function () {
			suscribeEvents();
		},
		renderNews : function (datos) {
			renderNews(datos);
		}
	};

})();

module.exports = showNews;