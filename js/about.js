(function ($) {
	'use strict';
    
    var App = {
        init: function() {
            this.CONTRIBUTORSAPI = './contributors.json';
            this._contributors = null;
            this.loadContributors();
        },
        loadContributors: function() {
            var self = this;
            
            var jqxhr = $.getJSON(this.CONTRIBUTORSAPI, function() {
                console.log( "loading" );
            })
            .done(function(data) {
                self._contributors = data;
            })
            .fail(function(error) {
                console.log( "error" );
            })
            .always(function() {
                self.updateContributorsUI();
            });
        },
        updateContributorsUI: function() {
            if(this._contributors != null) {
                var src = document.querySelector('#contributors-list-template').innerHTML;
                var compiled = Handlebars.compile(src);
                document.querySelector('.gcontributors').innerHTML = compiled(this._contributors);
            }
        }
    }
    
    App.init();
	
})(jQuery);
