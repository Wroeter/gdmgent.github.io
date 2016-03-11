(function($) {	
    
    /// Listen to navigation item click
    /// Swing to the connected hashtag / bookmark
    $('.nav__item-link').each(function(i){

        $( this ).click(function(ev){
            ev.preventDefault();
            goToPageWithSelector($( this).attr('href'));
            setActiveNavigationItem($( this).attr('href'));
            changeStateOffcanvas(true);
            return false;
        });
        
    });
    
    /// Function
    /// selector: the selector of the virtual page, ex: #about
    /// Go to a certain section or virtual page based on his selector
    function goToPageWithSelector(selector) {
        var obj = $(selector);
        if(obj.length > 0){
            $('html, body').animate({
                scrollTop: obj.offset().top
            }, 1000, 'swing', function(){
            });
        }
    }
    
    // Set Active Menu Item
   function setActiveNavigationItem(href) {
        var spaAnchorElement = document.querySelector('.nav__item-link[href="' + href + '"]');
        if (spaAnchorElement != null && typeof spaAnchorElement != 'undefined') {
            var spaActiveAnchorElement = spaAnchorElement.parentElement.parentElement.querySelector('.nav__item-link--active');
            if (spaActiveAnchorElement != null && typeof spaActiveAnchorElement != 'undefined') {
                spaActiveAnchorElement.classList.remove('nav__item-link--active');
                spaActiveAnchorElement.parentElement.classList.remove('nav__item--active');
            }
            spaAnchorElement.classList.add('nav__item-link--active');
            spaAnchorElement.parentElement.classList.add('nav__item--active');
        }
   }
	
})(jQuery);