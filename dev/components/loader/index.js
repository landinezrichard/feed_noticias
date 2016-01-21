var loader = (function () {
	/* Dependencias*/
	const $ = require('jquery');
	const loaderTemplate = require('./template.jade');
	const $body = $('body');

	function showLoader (){
		$body.append(loaderTemplate);
		//eliminamos el scroll de la pagina
		$body.css({'overflow-y':'hidden'});
	}

	function hideLoader () {
		$('.Loader-container').fadeOut(1000,function(){
			//eliminamos la capa de precarga
			$(this).remove();
			//permitimos scroll
			$body.css({'overflow-y':'auto'});
		});
	}

	return {
		showLoader : showLoader,
		hideLoader : hideLoader
	};

})();

module.exports = loader;