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
            
            this._arcade = Arcade;
            this._arcade.init(document.querySelector('.arcade'), 9, 20, 20);
            
			this._geoLocation = null;
			this._gMap = null;
			if(this._gMap == null) {
				this.checkGoogleMapsInitialized();
			}
            
            var self = this;
            this.resizeGoogleMaps();
            window.addEventListener('resize', function(ev) {
                var h = $(this).height();
                var w = $(this).width();
                var c = Math.min(h, w) / (2 * 9);
                var cw = (c > 20?20:c), ch = cw;
                
                self._arcade.resetCharacter(9, cw, ch);
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
            
            /// Listen to navigation item click
            /// Swing to the connected hashtag / bookmark
            $('a[href="#lecturers"]').on('click', function(ev) {

                ev.preventDefault();
                
                self.goToPageWithSelector($( this).attr('href'));
                
                return false;
                
            });
            
            /// Register waypoint for changing to look and feel of the header
            $('#lecturers').waypoint(function(direction){
                if(direction == 'down'){
                    $('.offcanvas__content-header').addClass('offcanvas__content-header--contentscrolled');
                } else {
                    $('.offcanvas__content-header').removeClass('offcanvas__content-header--contentscrolled');
                }
            }, { offset: '65%' } );
            
            $( window ).on('scroll', function(ev) {
                
                $('.space').each(function(i){
                    
                    var wrapper = $(this).parent();
                    var off = $(wrapper).offset().top;
                    var frm = off - $(wrapper).prev().height();
                    var stp = $(window).scrollTop();
                    if (stp > frm && stp <= off) {
                        var l = (stp / off) * ($(wrapper).width() - $(wrapper).find('.space__rocket').width() - 20);
                        $(wrapper).find('.space__rocket').css('left', l + 'px');
                    }
                    
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
						self._gMap.setStyles(data);
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