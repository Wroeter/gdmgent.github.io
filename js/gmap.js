/*
* Load Google Maps Asynchronous
* via appending script
* Don't forget the key: https://console.developers.google.com/flows/enableapi?apiid=maps_backend&keyType=CLIENT_SIDE&reusekey=true&pli=1
* Choose web API
*/
(function(){
    var key = 'AIzaSyDSlUp7PDxUqo4LwAP3mi_6y6uAk55D8OY';//Eigen Key Gebruiken!!!

    //Load Google Maps Async
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp'
        + '&key=' + key
        + '&callback=initGoogleMaps';
    document.body.appendChild(script);

    this.initGoogleMaps = function(){
        this._googleMapsInitialized = true;
    };

})();

var GMap = {
    init:function(container) {
        var mapOptions = {
            zoom:13,
            center: new google.maps.LatLng(51.048017, 3.727666),
            mapTypeControlOptions: {
                mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
            }
        }
        this._map = new google.maps.Map(document.querySelector('#' + container), mapOptions);
        google.maps.visualRefresh = true;
        google.maps.event.trigger(this._map, 'resize');
        this._geoLocationMarker = null, this._companyLocationMarker = null;
        this._companyLocation = null;
    },
    addCompany: function(lat, lng) {
        this._companyLocation = new google.maps.LatLng(lat, lng);
        this._companyLocationMarker = new google.maps.Marker({
            position: new google.maps.LatLng(lat, lng),
            title:"gdm.gent",
            icon:'./css/images/company_marker.png'
        });

        this._companyLocationMarker.setMap(this._map);
        this._map.setCenter(new google.maps.LatLng(lat, lng));  
    },
    addMarkerGeoLocation: function(geoLocation) {
        this._geoLocationMarker = new google.maps.Marker({
            position: new google.maps.LatLng(geoLocation.coords.latitude, geoLocation.coords.longitude),
            title:"My location",
            icon:'./css/images/home_marker.png'
        });

        this._geoLocationMarker.setMap(this._map);
    },
    setStyles: function(styles) {
        var styledMap = new google.maps.StyledMapType(styles, {name: "gdm.gent Styled Map"});
        // Associate the styled map with the MapTypeId and set it to display.
        this._map.mapTypes.set('map_style', styledMap);
        this._map.setMapTypeId('map_style');
    },
    refresh: function() {
        google.maps.visualRefresh = true;
        google.maps.event.trigger(this._map, 'resize');
        
        if(this._map != null) {
            this._map.setCenter(this._companyLocation); 
        }
    }
};