(function () {
	/* Dependencias*/
	const showMenu = require('./components/MainMenu');

	document.addEventListener('DOMContentLoaded', onDOMload);

	function onDOMload() {
		showMenu.init();
	}

}())