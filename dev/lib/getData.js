var getData = (function () {
	/* Dependencias*/
	const $ = require('jquery');
	const loader = require('../components/loader');
	const Easing   = require("jquery-easing");
	// const url = '/news_mock.json';
	

	const news_template = require('../components/News-item/template.jade');

	function getJson(url) {

		$.ajax({
			url: url,
			beforeSend: function(){
				loader.showLoader();
			},			
			success: function(datos){
				loader.hideLoader();
				console.log(datos);
				let contenido_html = '';
				for(var i=0; i< datos.length; i++){
					contenido_html += news_template(datos[i]);
				}
				$(contenido_html).find('.News-itemFull').css('display','none');
				// alert("Dato: " + JSON.stringify(datos));
				$('.News').html(contenido_html);
				$('.News').find('.News-itemFull').css('display','none');
				animateNewsItems();
			}
		});
	}

	function animateNewsItems () {		
		$('.News').find('.News-item').first().show( 600,'easeOutBounce', function showNext() {
			$( this ).next( '.News-item' ).show( 600,'easeOutBounce', showNext );
		});
	}


	return {
		init : function (url) {
			getJson(url);
		}
	};

})();

module.exports = getData;