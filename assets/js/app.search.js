function ready(cb) {
    /in/.test(document.readyState)
    ? setTimeout(ready.bind(null, cb), 90)
    : cb();
};

ready(function(){

    var Search = {
        "init": function() {
            this.JSONPAGEURL = window.baseurl + '/api.contents.json';
            this._searchStore = null;

            this.doSearch();
        },
        "doSearch": function() {
            var searchTerm = this.getQueryVariable('search-query');
            var that = this;

            if (searchTerm) {
                document.querySelector('#search-query-inpage').setAttribute("value", searchTerm);

                if(this._searchStore == null) {
                    var xhr = new XMLHttpRequest();
                    xhr.open('get', this.JSONPAGEURL, true);
                    xhr.responseType = 'json';
                    xhr.onload = function() {
                        if(xhr.status == 200) {
                            var data = (!xhr.responseType)?JSON.parse(xhr.response):xhr.response;
                            if(data != null) {
                                that._searchStore = data;
                                that.doSearch();
                            }
                        } else {
                            console.log(Error(`Error - status code #{xhr.status}!`));
                        }
                    }
                    xhr.onerror = function() {
                        console.log(Error('Network Error!'));
                    }
                    xhr.send();
                } else {
                    // Initalize lunr with the fields it will be searching on. I've given title
                    // a boost of 10 to indicate matches on this field are more important.
                    var idx = lunr(function () {
                        this.field('id');
                        this.field('title', { boost: 10 });
                        this.field('content');
                    });

                    for (var i=0; i < this._searchStore.length; i++) { // Add the data to lunr
                        idx.add({
                            'id': this._searchStore[i].id,
                            'title': this._searchStore[i].title,
                            'content': this._searchStore[i].content,
                            'url': this._searchStore[i].url
                        });
                    }

                    this.displaySearchResults(idx.search(searchTerm), this._searchStore);
                }
            }
        },
        "displaySearchResults": function(results, searchStore) {
            if (results != null && results.length > 0 && searchStore != null) { // Are there any results?
                var resultsHtmlString = '';
                for (var i = 0; i < results.length; i++) {  // Iterate over the results
                    var item = _.find(searchStore, function(o) {
                        return o.id == results[i].ref;
                    });
                    if(item != null && typeof item != 'undefined') {
                        resultsHtmlString += '<li><a href="' + item.url + '"><h3>' + item.title + '</h3></a>';
                        resultsHtmlString += '<p>' + item.content.substring(0, 150) + '...</p></li>';
                    }
                }
                document.querySelector('#search-results').innerHTML = resultsHtmlString;
            }
        },
        "getQueryVariable": function(variable) {
            var query = window.location.search.substring(1);
            var vars = query.split('&');

            for (var i = 0; i < vars.length; i++) {
                var pair = vars[i].split('=');

                if (pair[0] === variable) {
                    return decodeURIComponent(pair[1].replace(/\+/g, '%20'));
                }
            }
        }
    };

    Search.init();
});