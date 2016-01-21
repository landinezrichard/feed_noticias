var getData = (function () {
	/* Dependencias*/
	const $ = require('jquery');
	const loader = require('../components/loader');
	const showNews = require('../components/News');

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
			// peticion y render
			getJson(url);
		}
	}

	return {
		init : function (url) {
			cache(url);
		}
	};

})();

module.exports = getData;