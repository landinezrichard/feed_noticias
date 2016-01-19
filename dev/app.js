(function () {
	/* Dependencias*/
	const showMenu = require('./components/MainMenu');
	const showNews = require('./components/News');

	document.addEventListener('DOMContentLoaded', onDOMload);

	function onDOMload() {
		showMenu.init();
		showNews.init();
	}

}())