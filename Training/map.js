// google map 
function initialize() {
            var mapOptions = {
                center: new google.maps.LatLng(56.3947167, -3.4448415),
                zoom: 16,
                mapTypeId: google.maps.MapTypeId.HYBRID,
                scrollwheel: true,
                draggable: true,
                panControl: true,
                zoomControl: true,
                mapTypeControl: true,
                scaleControl: true,
                streetViewControl: true,
                overviewMapControl: true,
                rotateControl: true,
            };
            var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
        }
        google.maps.event.addDomListener(window, 'load', initialize);
