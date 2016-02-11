(function ($) {
	'use strict';
    
    var App = {
        init: function() {
            this.FACEBOOKPAGEFEEDGDM = 'https://graph.facebook.com/GrafischeendigitalemediaArteveldehogeschool/feed?access_token=1250882038255610|84ce623a6979e4002cc3818a5bc61237';
            this._feedPosts = null;
            this.loadFeed(1);
        },
        loadFeed: function(page) {
            var self = this;
            
            var jqxhr = $.getJSON(this.FACEBOOKPAGEFEEDGDM, function() {
                console.log( "loading" );
            })
            .done(function(data) {
                self._feedPosts = data.data;
            })
            .fail(function(error) {
                console.log( "error" );
            })
            .always(function() {
                self.updateFeedUI();
            });
        },
        updateFeedUI: function() {
            if(this._feedPosts != null) {
                var htmlContent = '';
                
                $.each(this._feedPosts, function(index, post) {
                    htmlContent += '<div class="flex-grid__column-bp1-12">';
                    htmlContent += '<artcile class="post" data-id="' + post.id + '">';
                    htmlContent += '<section class="post__header">' + post.created_time + '</section>';
                    htmlContent += '<section class="post__meta">' + post.story + '</section>';
                    htmlContent += '<section class="post__body">' + post.message + '</section>';
                    htmlContent += '</article>';
                    htmlContent += '</div>';
                });
                
                $('.feed').html(htmlContent);
            }
        }
    }
    
    App.init();
	
})(jQuery);
