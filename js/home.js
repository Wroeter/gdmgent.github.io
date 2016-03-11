/*
*	Description: gdm.gent
*	Modified: 03/14/2016
*	Version: 1.0.1
*	Author: Philippe De Pauw - Waterschoot
* 	-----------------------------------------------
*/

(function($) {
	
	var App = {
		init: function() {
            this._offcanvas = null;
            if(this._offcanvas == null) {
				this._offcanvas = Offcanvas;
			}
            this._offcanvas.init();
            
			this._geoLocation = null;
			this._gMap = null;
			if(this._gMap == null) {
				this.checkGoogleMapsInitialized();
			}
            
            var self = this;
            this.resizeGoogleMaps();
            window.addEventListener('resize', function(ev) {
                self.resizeGoogleMaps();
            });
            
            /// Listen to navigation item click
            /// Swing to the connected hashtag / bookmark
            $('.nav__item-link').each(function(i){

                $( this ).click(function(ev){
                    ev.preventDefault();
                    self.goToPageWithSelector($( this).attr('href'));
                    self.setActiveNavigationItem($( this).attr('href'));
                    self._offcanvas.changeStateOffcanvas(true);
                    return false;
                });
                
            });
		},
		checkGoogleMapsInitialized: function() {
            var self = this;

            if(!window._googleMapsInitialized) {
                window.setTimeout(function(){self.checkGoogleMapsInitialized()}, 1000);
            } else {
                this._gMap = GMap;
                this._gMap.init('gmap');
                
                this._gMap.addCompany(51.0872061, 3.6699359);
                
                this.loadGoogleMapsStyles();
            }
        },
        loadGoogleMapsStyles: function() {
            var self = this;
			
			Utils.getJSONByPromise('./data/gmap_styles.json').then(
				function(data) {
					if(self._gMap != null) {
						self._gMap.setStyles(data.styles);
					}
				},
				function(error) {
                    console.log(error);
				}
			)
        },
        resizeGoogleMaps: function() {
            var h = $(window).height() - $('#gmap').offset().top;
            document.querySelector('#gmap').style.height = h + 'px';
            
            if(this._gMap != null) {
                this._gMap.refresh();
            }
        },
        // Set Active Navigation Item
        setActiveNavigationItem: function(href) {
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
        },
        /// Function
        /// selector: the selector of the virtual page, ex: #about
        /// Go to a certain section or virtual page based on his selector
        goToPageWithSelector: function(selector) {
            var obj = $(selector);
            if(obj.length > 0){
                $('html, body').animate({
                    scrollTop: obj.offset().top
                }, 1000, 'swing', function(){
                });
            }
        }
	};
	
	App.init();
	
})(jQuery);