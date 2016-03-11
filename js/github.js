(function ($) {
	'use strict';
    
    var App = {
        init: function() {
            this.GITHUBORG = 'https://api.github.com/orgs/gdmgent';
            this.GITHUBORGREPOSAPI = 'https://api.github.com/orgs/gdmgent/repos';
            this._org = null, this._repos = null;
            this.loadOrganization();
            this.loadOrganizationRepos(1);
        },
        loadOrganization: function() {
            var self = this;
            
            var jqxhr = $.getJSON(this.GITHUBORG, function() {
                console.log( "loading" );
            })
            .done(function(data) {
                self._org = data;
            })
            .fail(function(error) {
                console.log( "error" );
            })
            .always(function() {
                self.updateOrganizationUI();
            });
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
        updateOrganizationUI: function() {
            if(this._org != null) {
                var src = document.querySelector('#organization-template').innerHTML;
                var compiled = Handlebars.compile(src);
                document.querySelector('.gh-organization').innerHTML = compiled(this._org);
            }
        },
        updateOrganizationReposUI: function() {
            if(this._repos != null) {
                var src = document.querySelector('#repositories-list-template').innerHTML;
                var compiled = Handlebars.compile(src);
                document.querySelector('.gh-organization-repos').innerHTML = compiled(this._repos);
            }
        }
    }
    
    App.init();
	
})(jQuery);
