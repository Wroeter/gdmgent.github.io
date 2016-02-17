(function ($) {
	'use strict';
    
    var App = {
        init: function() {
            this.GITHUBORGREPOSAPI = 'https://api.github.com/orgs/gdmgent/repos';
            this._repos = null;
            this.loadOrganizationRepos(1);
        },
        loadOrganizationRepos: function(page) {
            var self = this;
            
            var jqxhr = $.getJSON(this.GITHUBORGREPOSAPI, function() {
                console.log( "loading" );
            })
            .done(function(data) {
                self._repos = data;
            })
            .fail(function(error) {
                console.log( "error" );
            })
            .always(function() {
                self.updateOrganizationReposUI();
            });
        },
        updateOrganizationReposUI: function() {
            if(this._repos != null) {
                var src = document.querySelector('#repositories-list-template').innerHTML;
                var compiled = Handlebars.compile(src);
                document.querySelector('.gh-organization').innerHTML = compiled(this._repos);
            }
        }
    }
    
    App.init();
	
})(jQuery);
