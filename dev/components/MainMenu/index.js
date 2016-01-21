var showMenu = (function () {

	const btnMenu = document.getElementById('showMenu');
	const menu = document.getElementById('menu');
	const clase = 'MainMenu-list--show';

	function suscribeEvents () {
		btnMenu.addEventListener('click',onClickMenu);
	}

	function onClickMenu () {
		menu.classList.toggle(clase);
	}

	return {
		init : function () {
			suscribeEvents();
		},
		close : onClickMenu
	};

})();

module.exports = showMenu;