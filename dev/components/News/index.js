var showNews = (function () {
	/* Dependencias*/
	const $ = require('jquery');
	const newsList = $('.News');
	const clase    = 'News-itemFull--show';
	let newsItem   = $('.News-itemFull'); 

	// function suscribeEvents () {
	// 	newsList.on('click','.News-item', function () {
	// 		$(this).find('.News-itemFull').toggleClass(clase);
	// 	});
	// }

	function suscribeEvents () {
		newsItem.css('display','none');
		// newsList.on('click','.News-item', function () {
		
		// 	$(this).find('.News-itemFull').slideToggle('slow');
		// 	
		// });

		$('.News-itemLight').on('click', function () {
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