/*
*	Description: Contact gdm.gent
*	Modified: 02/18/2016
*	Version: 1.0.0
*	Author: Philippe De Pauw - Waterschoot
* 	-----------------------------------------------
*/

(function() {
	
	var App = {
		init: function() {
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
			
			Utils.getJSONByPromise('gmap_styles.json').then(
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
        }
	};
	
	App.init();
	
})();