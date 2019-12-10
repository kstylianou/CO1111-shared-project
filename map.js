
    // Get the modal
    var modal1 = document.getElementById("myModal1");

    // Get the button that opens the modal
    let btn1 = document.getElementById("myBtn1");
    btn1.style.display = "block";
    // Get the <span> element that closes the modal
    var span1 = document.getElementsByClassName("close1")[0];

    // When the user clicks the button, open the modal
    btn1.onclick = function () {
        modal1.style.display = "block";
        map();
    };

// When the user clicks on <span> (x), close the modal
    span1.onclick = function () {
        modal1.style.display = "none";
    };
// When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal1) {
            modal1.style.display = "none";
        }
    };

// mapBox Map + markers
function map() {

    mapboxgl.accessToken = 'pk.eyJ1Ijoia3lyaWFrb3M5OGIiLCJhIjoiY2szb28yOXBsMG80MjNwcXJ1cnYzd2cwYSJ9.uFxaEPB3KDykZn_4G0UPEg';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/light-v10',
        center: [LongitudeArr[0], LatitudeArr[0]],
        zoom: 15
    });
    console.log(LongitudeArr[0], LatitudeArr[0]);

    let index = 0;
    let pop = index + 1;
    var geojson = {
        type: 'FeatureCollection',
        features: [{
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [LongitudeArr[index], LatitudeArr[index]]
            },
            properties: {
                title: 'Position: ',
                description: pop
            }
        }],

    };
    console.log(geojson);
    if(LatitudeArr.length-1 >0) {
        for (let i = 0; i < LatitudeArr.length - 1; i++) {
            index++;
            pop = index + 1;
            geojson.features.push({
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [LongitudeArr[index], LatitudeArr[index]]
                },
                properties: {
                    title: 'Position: ',
                    description:  pop
                }
            });
        }
    }
    // add markers to map
    geojson.features.forEach(function (marker) {

        // create a HTML element for each feature
        var el = document.createElement('div');
        el.className = 'marker';

        // make a marker for each feature and add to the map
        new mapboxgl.Marker(el)
            .setLngLat(marker.geometry.coordinates)
            .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
                .setHTML('<h3>' + marker.properties.title + '</h3><p>' + marker.properties.description + '</p>'))
            .addTo(map);
    });



}