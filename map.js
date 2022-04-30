import './style.css';
import {Map, View, Feature} from 'ol';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import OSM from 'ol/source/OSM';
import * as olProj from 'ol/proj';
import Point from 'ol/geom/Point';
import {Vector as VectorSource} from 'ol/source';
import DayNight from 'ol-ext/source/DayNight';
import {Style, Fill} from 'ol/style';

import {get_lat, get_lon, set_lon_lat} from './length.js';

// Loob uue kaardi. Seab algseks keskpunktiks Tallinna.
const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM()
    })
  ],
  view: new View({
  center: olProj.fromLonLat([24.74528, 59.43722]),
  zoom: 4,
  }),
});

// Marker, mis näitab kaardil kus täpselt koordinaadid asuvad.
var pinFeature = new Feature(new Point(olProj.fromLonLat([24.74528, 59.43722])));
var pinLayer = new VectorLayer({
	source: new VectorSource({features: [pinFeature]})
});
map.addLayer(pinLayer);

// Layer, mis muudab hetkel öise ala tumedamaks.
var dayNightLayer = new VectorLayer({
	source: new DayNight ({time: new Date()}),
	style: new Style({
		fill: new Fill({color: 'rgba(100, 100, 100, 0.33)'})
	})
});
map.addLayer(dayNightLayer);

// https://openlayers.org/en/latest/examples/popup.html
// Seab koordinaadid kaardile vajutuse põhjal. Liigutab markeri sinna, kus vajutati.
map.on('singleclick', function (evt) {
	const coordinate = evt.coordinate;
	pinFeature.getGeometry().setCoordinates(coordinate);
	set_lon_lat(olProj.toLonLat(coordinate));
});

// Liigutab kaardi keskpunkti otsitavate koordinaatide juurde.
document.getElementById('find').addEventListener(
  'click',
  function () {
	setTimeout(function(){
		var laiuskraad = get_lat();
		var pikkuskraad = get_lon();
		map.getView().setCenter(olProj.transform([pikkuskraad, laiuskraad], 'EPSG:4326', 'EPSG:3857'));
		pinFeature.getGeometry().setCoordinates(olProj.transform([pikkuskraad, laiuskraad], 'EPSG:4326', 'EPSG:3857'));
	}, 5);
  },
  false
);
