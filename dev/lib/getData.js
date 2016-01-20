var getData = (function () {
	/* Dependencias*/
	const $ = require('jquery');
	const url = '/news_mock.json';
	// const showNews = require('../components/News');

	const news_template = require('../components/News-item/template.jade');

	function lee_json() {
		$.getJSON(url, function(datos) {
			let contenido_html = '';
			// datos = JSON.stringify(datos);
			// datos = JSON.parse(datos);
			for(var i=0; i< datos.length; i++){
				contenido_html += news_template(datos[i]);
			}
			$(contenido_html).find('.News-itemFull').css('display','none');
			
			// alert("Dato: " + JSON.stringify(datos));
			// $('.News').append(contenido_html);
			$('.News').html(contenido_html);
			$('.News').find('.News-itemFull').css('display','none');
			
			// showNews.init();
			
		});
	}


	return {
		init : function () {
			lee_json();
		}
	};

})();

module.exports = getData;