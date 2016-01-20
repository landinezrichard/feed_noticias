var showNews = (function () {
	/* Dependencias*/
	const $ = require('jquery');	
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

	return {
		init : function () {
			suscribeEvents();
		}
	};

})();

module.exports = showNews;