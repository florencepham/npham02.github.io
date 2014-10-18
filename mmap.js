var data = '{"characters":[{"name":"carmen","loc":{"latitude":37.81972,"longitude":-122.47861,"note":"Golden Gate Bridge"}}],"students":[{"login":"tlubeck","lat":42.5335,"lng":-71.1036,"created_at":"Tue Oct 07 2014 05:08:03 GMT+0000 (UTC)","_id":"543375331e214f020086c425"},{"login":"mchow","lat":42.5335,"lng":-71.1036,"created_at":"Tue Oct 07 2014 05:00:57 GMT+0000 (UTC)","_id":"543373891e214f020086c424"},{"login":"forbiddencity","lat": 39.9147,"lng": 116.3906,"created_at":"Tue Oct 07 2014 04:59:53 GMT+0000 (UTC)","_id":"543373491e214f020086c423"},{"login":"hawaii","lat": 21.3114,"lng":-157.7964,"created_at":"Tue Oct 07 2014 04:59:03 GMT+0000 (UTC)","_id":"543373171e214f020086c422"},{"login":"effeitower","lat": 48.8582,"lng": 2.2945,"created_at":"Tue Oct 07 2014 04:58:02 GMT+0000 (UTC)","_id":"543372da1e214f020086c421"}]}';
var map;
var landmark;
var marker;
var parsed;
var request = new XMLHttpRequest();

var myLat;
var myLng;
var me = new google.maps.LatLng(myLat, myLng); 

var infowindow = new google.maps.InfoWindow();
var studentsinfo;


//create a map
function initialize()
{
	var mapOptions = { 
	zoom: 3,
	center: new google.maps.LatLng(myLat, myLng), //change later on
	mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	
	map = new google.maps.Map(document.getElementById("map_canvas"), 
		mapOptions);

	var myLocation = markMe();

	parsed = JSON.parse(data);

	charactersMaker(parsed);
	studentsMaker(parsed);

	//service = new google.maps.places.PlacesService(map);
	//service.search(request, studentsMaker(parsed));
	//service.search(request, studentsMaker(parsed));

}
google.maps.event.addDomListener(window, 'load', initialize);

function markMe()
{
	if (navigator.geolocation) { 
		navigator.geolocation.getCurrentPosition(function(position){
			myLat = position.coords.latitude; 
			myLng = position.coords.longitude;
		});
	}
	markerMaker(myLat, myLng, "Me!");
}

function studentsMaker(parsed)
{
	//mark students
	for (i = 0; i < parsed['students'].length; i++){
		studentsinfo = "login: " + parsed['students'][i]['login'] + 
			", " + "latitude: " + parsed['students'][i]['lat'] + 
			", " + "longitude: " + parsed['students'][i]['lng'] +
			", " + "timestamp: " + parsed['students'][i]['created_at'];
		console.log(studentsinfo);
		markerMaker(parsed['students'][i]['lat'], 
			parsed['students'][i]['lng'],
			studentsinfo);
	}
}

function markerMaker(lat, lng, stringtitle)
{
	landmark = new google.maps.LatLng (lat, lng);
	marker = new google.maps.Marker({ position:landmark, title: stringtitle });
	marker.setMap(map);

	google.maps.event.addListener(marker, 'click', function() {
		infowindow.close();
		infowindow.setContent(marker.title);
		infowindow.open(map, this);
	});
}




function charactersMaker(parsed)
{
	//mark characters
	for (i = 0; i < parsed.characters.length; i++)	{
		if (typeof parsed['characters'][i]['loc'] != 'undefined')
			markerMaker(parsed['characters'][i]['loc']['latitude'], 
				parsed['characters'][i]['loc']['longitude'],
				parsed['characters'][i]['name']);
	}
}
