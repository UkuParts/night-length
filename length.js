import {getSunriseSunsetInfo} from "sunrise-sunset-api";
import convert from "geo-coordinates-parser";
import {fromString} from 'any-date-parser';
import DateDiff from "date-diff";

document.getElementById('find').addEventListener(
  'click',
  function () {
	find();
  }
);

var sunset;
var sunrise;
var coords;

function find(){
	// Loeb sisendväljade väärtused.
	var latitude = document.getElementById("lat").value;
	var longitude = document.getElementById("lon").value;
	var date = Date.fromString(document.getElementById("date").value);
	
	// Parse'ib koordinaadid.
	coords = convert(latitude + "," + longitude);
	
	// Kuvab koordinaadid EPSG:4326 formaadis.
	display_coords(latitude, longitude);

	// leiab otsitavale kuupäevale järgmise.
	const next_date = new Date(date);
	next_date.setDate(date.getDate() + 1);
	
	// Saab API'lt andmed.
	get_data(date.toISOString().substring(0, 10))
		.then(response => {
			sunset = new Date(response.sunset);
		});
	
	get_data(next_date.toISOString().substring(0, 10))
		.then(response => {
			sunrise = new Date(response.sunrise);
			
			// Väljastab vastuse.
			output();
		});
}

// https://www.npmjs.com/package/sunrise-sunset-api
// Suhtleb API'ga.
async function get_data(date){
	const response = await getSunriseSunsetInfo({
        latitude: coords.decimalLatitude + 0.00000001,
        longitude: coords.decimalLongitude + 0.00000001,
		date: date,
		formatted: false
    });
	
	return response;
}

// Kuvab koordinaadid EPSG:4326 formaadis.
function display_coords(){
	var formatted_coords = coords.toCoordinateFormat(convert.to.DMS).split(", ");
	document.getElementById("lat").value = formatted_coords[0];
	document.getElementById("lon").value = formatted_coords[1];
}

// Väljastab vastuse.
function output(){
	var diff = new DateDiff(sunrise, sunset);
	
	document.getElementById("night_length").innerHTML = Math.floor(diff.hours()) + " tundi ja " + Math.floor(diff.minutes()) % 60 + " minutit";
	document.getElementById("sunset").innerHTML = format_date(sunset);
	document.getElementById("sunrise").innerHTML = format_date(sunrise);
}

// Tagastab kuupäeva hh:mm formaadis.
function format_date(date){
	return date.getHours().toString().padStart(2, "0") + ":" + date.getMinutes().toString().padStart(2, "0");
}

export function get_lat(){
	return coords.decimalLatitude;
}

export function get_lon(){
	return coords.decimalLongitude;
}

export function set_lon_lat(given_coords){
	coords = convert(given_coords[1] + ", " + given_coords[0]);
	display_coords();
}