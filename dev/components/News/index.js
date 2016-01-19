var showNews = (function () {
    /* Dependencias*/
    const $ = require('jquery');
    const newsList = $('.News');
    const clase    = 'News-itemFull--show';   

    function suscribeEvents () {
        newsList.on('click','.News-item', function () {
            $(this).find('.News-itemFull').toggleClass(clase);           
        });
    }    

    return {
        init : function () {
            suscribeEvents();
        }
    };

})();

module.exports = showNews;