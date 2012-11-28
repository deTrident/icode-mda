var map;
var markerClusterer;
var markerArray = [];

/* Initialize */
function initialize()
{
	var centerCoord = new google.maps.LatLng(0,0);

	var myOptions = {

			zoom: 2,
			center: centerCoord,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			mapTypeControlOptions: {
				mapTypeIds: [google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.SATELLITE, google.maps.MapTypeId.HYBRID, google.maps.MapTypeId.TERRAIN],
				//mapTypeIds: ['OSM', google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.SATELLITE, google.maps.MapTypeId.HYBRID, google.maps.MapTypeId.TERRAIN],
				style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR//DROPDOWN_MENU
			}
	};


	map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);


	markerClusterer = new MarkerClusterer(map);
	markerClusterer.setMinimumClusterSize(20);

	getCurrentAISFromDB(0,0);

//	var markerCluster = new MarkerClusterer(map, markerArray);
//	alert(markerArray.length);
	//addWmsLayers(map);
	//var custom_commands = [];
	//loadWMS(map,"http://mapserver-slp.mendelu.cz/cgi-bin/mapserv?map=/var/local/slp/krtinyWMS.map&", custom_commands);
	//setMapCenterToCenterOfMass(map,tips);

	//addMarkersAndInfoWindows(map,tips);
	//addTracks(map,tips);

	addDrawingManager(map);	
	//addWeatherLayer(map);
	//addHeatmap(map);

   google.maps.event.addListener(map, 'click', function() {	
      if (markerArray) {
   		for (i in markerArray) {
            if (markerArray[i].infoWindow) {
   			   markerArray[i].infoWindow.close();
            }
   		}
   	}
      alert(markerArray.length); });
   google.maps.event.addListener(map, 'center_changed', function() { closeAllInfowindows(); });
}

/* Get AIS data from XML, which is from database */
function getCurrentAISFromDB(arg1, arg2)
{
   var typesSelected =  getTypesSelected();
	for(var i = 0; i<typesSelected.length; i++){
		var infoWindow = new google.maps.InfoWindow;
		//var phpWithArg = "icode_example_db_query.php?type=\"" + typesSelected[i] + "\"";
		var phpWithArg = "icode_example_db_query.php";
		downloadUrl(phpWithArg, 
                  function(data) {
			var xml = data.responseXML;
			if(xml == null){return;}
			var ais_tips = xml.documentElement.getElementsByTagName("ais");
			for (var i = 0; i < ais_tips.length; i++) {
				var key_column = ais_tips[i].getAttribute("key_column");
				var messagetype = ais_tips[i].getAttribute("messagetype");
				var mmsi = ais_tips[i].getAttribute("mmsi");
				var navstatus = ais_tips[i].getAttribute("navstatus");
            var rot = ais_tips[i].getAttribute("rot");
            var sog = ais_tips[i].getAttribute("sog");
				var lon = ais_tips[i].getAttribute("lon");
				var lat = ais_tips[i].getAttribute("lat");
				var point = new google.maps.LatLng(
						parseFloat(ais_tips[i].getAttribute("lat")),
						parseFloat(ais_tips[i].getAttribute("lon")));
				var cog = ais_tips[i].getAttribute("cog");
				var true_heading = ais_tips[i].getAttribute("true_heading");
				var datetime = ais_tips[i].getAttribute("datetime");
				var imo = ais_tips[i].getAttribute("imo");
				var vesselname = ais_tips[i].getAttribute("vesselname");
				var vesseltypeint = ais_tips[i].getAttribute("vesseltypeint");
				var length = ais_tips[i].getAttribute("length");
				var shipwidth = ais_tips[i].getAttribute("shipwidth");
				var bow = ais_tips[i].getAttribute("bow");
				var stern = ais_tips[i].getAttribute("stern");
				var port = ais_tips[i].getAttribute("port");
				var starboard = ais_tips[i].getAttribute("starboard");
				var draught = ais_tips[i].getAttribute("draught");
				var destination = ais_tips[i].getAttribute("destination");
				var callsign = ais_tips[i].getAttribute("callsign");
				var posaccuracy = ais_tips[i].getAttribute("posaccuracy");
				var eta = ais_tips[i].getAttribute("eta");
				var posfixtype = ais_tips[i].getAttribute("posfixtype");
				var streamid = ais_tips[i].getAttribute("streamid");

				var html = '<div id="content">'+
				'<div id="siteNotice">'+
				'</div>'+
				'<h2 id="firstHeading" class="firstHeading">' + vesselname + '</h2>'+
				'<div id="bodyContent">'+
				'Vesseltypeint: ' + vesseltypeint + '<br>'+
				'Navstatus: ' + navstatus + '<br>'+
				'Length x Width: ' + length + ' X ' + shipwidth + '<br>'+
				'Draught: ' + draught  + '<br>'+
				'Destination: ' + destination + '<br>'+
				'ETA: ' + eta + '<br>'+
            'Datetime: ' + datetime + '<br>'+
				'</div>'+
				'</div>';

				var iconLocation = getIconType(vesseltypeint);
				var marker = new google.maps.Marker({
					//map: map,
					position: point,
					icon: iconLocation
				});

				bindInfoWindow(marker, map, infoWindow, html);
				markerArray.push(marker);
				markerClusterer.addMarker(marker);
			}
//   addHeatmap(map);
		});
	}
}

function bindInfoWindow(marker, map, infoWindow, html) {
	google.maps.event.addListener(marker, 'click', function() {
		infoWindow.setContent(html);
		infoWindow.open(map, marker);
      //setTimeout(function () { infoWindow.close(); }, 1000);
      setTimeout(function () { closeAllInfowindows(); }, 1000);
	});
}

function downloadUrl(url, callback) {
	var request = window.ActiveXObject ?
			new ActiveXObject('Microsoft.XMLHTTP') :
				new XMLHttpRequest;

			request.onreadystatechange = function() {
				if (request.readyState == 4) {
					request.onreadystatechange = doNothing;
					callback(request, request.status);
				}
			};

			request.open('GET', url, true);
			request.send(null);
}

function doNothing() {}

function clearMap()
{

}

function refreshLayers() {
	clearOverlays();
	deleteOverlays();
	markerClusterer.clearMarkers();
	clearMap();
	getCurrentAISFromDB(map.getBounds().getSouthWest(), map.getBounds().getNorthEast());
	//addMarkersAndInfoWindows(map,tips);
	//addTracks(map,tips);

} 

function refreshPositions() {
	refreshLayers();
}

/*
function addMarkersAndInfoWindows(map, tips)
{
	for(var i=0; i<tips.length; i++)
	{
		var contentString = '<div id="content">'+
		'<div id="siteNotice">'+
		'</div>'+
		'<h2 id="firstHeading" class="firstHeading">' + tips[i].name + '</h2>'+
		'<div id="bodyContent">'+
		'Flag: ' + tips[i].flag + '<br>' +
		'Ship Type: ' + tips[i].ship_type + '<br>'+
		'Status: ' + tips[i].status + '<br>'+
		'Speed/Course: ' + tips[i].speed + ' / ' + tips[i].course + '<br>'+
		'Length x Breadth: ' + tips[i].length + ' X ' + tips[i].breadth + '<br>'+
		'Draught: ' + tips[i].draught  + '<br>'+
		'Destination: ' + tips[i].destination + '<br>'+
		'ETA: ' + tips[i].eta + '<br>'+
		'Received: ' + tips[i].received + '<br>'+
		'</div>'+
		'</div>';

		var placemarkCoord = new google.maps.LatLng(tips[i].lat, tips[i].lon);
		//var iconLocation = getIconLocation(tips[i].ship_type);
		var iconLocation = getIconType(tips[i].vesseltypeint);
		var marker = new google.maps.Marker({
			position: placemarkCoord,
			map: map,
			icon: iconLocation,
			title:tips[i].name
		});

		var infowindow = new google.maps.InfoWindow({content: contentString});
		marker.infowindow=infowindow;
		google.maps.event.addListener(marker, 'click', function() {
			//close the windows
			closeAllInfowindows();
			this.infowindow.open(map,this);
		});	

		markerArray.push(marker);
	}
}
*/

function getTypesSelected()
{
	var types = [];
	if(document.getElementById("CheckType0").checked ){
		types.push(UNSPECIFIED); 
	}
	if(document.getElementById("CheckType1").checked ){
		types.push(NAVAIDS);        
	}
	if(document.getElementById("CheckType2").checked ){
		types.push(FISHING);        
	}
	if(document.getElementById("CheckType3").checked ){
		types.push(TUG);        
	}
	if(document.getElementById("CheckType4").checked ){
		types.push(HIGHSPEED);        
	}
	if(document.getElementById("CheckType6").checked ){
		types.push(PASSENGER);        
	}
	if(document.getElementById("CheckType7").checked ){
		types.push(CARGO);        
	}
	if(document.getElementById("CheckType8").checked ){
		types.push(TANKER);        
	}
	if(document.getElementById("CheckType9").checked ){
		types.push(YACHT);        
	}
	if(document.getElementById("CheckMoving").checked ){
		types.push(MOVING);        
	}
	if(document.getElementById("CheckStopped").checked ){
		types.push(STOPPED);        
	}
	return types;
}

var UNSPECIFIED = "Unspecified Ships";//shipicons/lightgray1_90.png
var NAVAIDS = "Navigation Aids";//shipicons/pink0.pnG
var FISHING = "Fishing";//Shipicons/brown1_90.png
var TUG =  "Tug, Pilot, etc";//shipicons/cyan1_90.png
var HIGHSPEED = "High Speed Craft";//shipicons/yellow1_90.png
var PASSENGER = "Passenger Vessel"; //shipicons/blue1_90.png
var CARGO = "Cargo Vessels"; //shipicons/lightgreen1_90.png"
var TANKER = "Tanker - Hazard D (Recognizable)";//shipicons/red1_90.png
var YACHT = "Yachts and Others";//shipicons/magenta1_90.png
var MOVING = "Ships Underway";//shipicons/white1_90.png
var STOPPED = "Anchored/Moored";//"shipicons/white0.png

function getIconType(vesseltypeint)
{
   return "shipicons/red1_90.png";
}

function getIconLocation(ship_type)
{
	if(ship_type == UNSPECIFIED){
		return "shipicons/lightgray1_90.png";
	}else if(ship_type == TANKER){
		return "shipicons/red1_90.png";
	}else if(ship_type == NAVAIDS){
		return "shipicons/pink0.png";
	}else if(ship_type == FISHING){
		return "shipicons/brown1_90.png";
	}else if(ship_type == TUG){
		return "shipicons/cyan1_90.png";
	}else if(ship_type == HIGHSPEED){
		return "shipicons/yellow1_90.png";
	}else if(ship_type == PASSENGER){
		return "shipicons/blue1_90.png";
	}else if(ship_type == CARGO){
		return "shipicons/lightgreen1_90.png";
	}else if(ship_type == YACHT){
		return "shipicons/magenta1_90.png";
	}else if(ship_type == MOVING){
		return "shipicons/white1_90.png";
	}else if(ship_type == STOPPED){
		return "shipicons/white0.png";
	}else{
		return "shipicons/white0.png";
	}
}

function closeAllInfowindows()
{
	if (markerArray) {
		for (i in markerArray) {
         if (markerArray[i].infoWindow) {
			   markerArray[i].infoWindow.close();
         }
		}
	}	
}

function tipDisplay(marker, info_window)
{
	this.marker = marker;
	this.info_window = info_window;
}

//Removes the overlays from the map, but keeps them in the array
function clearOverlays() {
	if (markerArray) {
		for (i in markerArray) {
			markerArray[i].setMap(null);
		}
	}
}

//Shows any overlays currently in the array
function showOverlays() {
	if (markerArray) {
		for (i in markerArray) {
			markerArray[i].setMap(map);
		}
	}
}

//Deletes all markers in the array by removing references to them
function deleteOverlays() {
	if (markerArray) {
		for (i in markerArray) {
			markerArray[i].setMap(null);
		}
		markerArray.length = 0;
	}
}

function addTracks(map, tips)
{ 
	var track = new Array();
	for(var i=0; i<tips.length; i++)
	{
		track[i] = new google.maps.LatLng(tips[i].lat, tips[i].lon);
	}
	var polyOptions = 
	{
			path: track,
			strokeColor: '#00ff25',
			strokeOpacity: 0.7,
			strokeWeight: 3
	};

	var polyline = new google.maps.Polyline(polyOptions);	
	polyline.setMap(map);
}

function changePorts()
{}

function changeStations()
{}

function changeLights()
{}

function changePhotos()
{}

//adds an example heat map
//this could be for example a probability of pirate attack map
function addHeatmap(map)
{
   /*
	var heatMapLayer = new google.maps.FusionTablesLayer({
		query: {
			select: 'location',
			from: '1xWyeuAhIFK_aED1ikkQEGmR8mINSCJO9Vq-BPQ'
		},
		heatmap: {
			enabled: true
		}
	});

	heatMapLayer.setMap(map);	
   */

   var heatmapData = new Array();

   for(var i=0; i<markerArray.length; i++)
   {
      heatmapData[i] = markerArray[i].getPosition();
   }

   var heatmap = new google.maps.visualization.HeatmapLayer({
     data: heatmapData
   });

   heatmap.setMap(map);

}


function addWeatherLayer(map)
{
	var weatherLayer = new google.maps.weather.WeatherLayer({
		temperatureUnits: google.maps.weather.TemperatureUnit.FAHRENHEIT
	});
	weatherLayer.setMap(map);

	var cloudLayer = new google.maps.weather.CloudLayer();
	cloudLayer.setMap(map);	
}

//adds a drawing manager to the map for adding custom shapes and placemarks
//to your map
function addDrawingManager(map)
{
	var drawingManager = new google.maps.drawing.DrawingManager({
		drawingMode: null,
		drawingControl: true,
		drawingControlOptions: {
			position: google.maps.ControlPosition.TOP_LEFT,
			drawingModes: [
			               google.maps.drawing.OverlayType.MARKER,
			               google.maps.drawing.OverlayType.CIRCLE,
			               google.maps.drawing.OverlayType.POLYGON,
			               google.maps.drawing.OverlayType.RECTANGLE
			               ]
		},
		circleOptions: {
			fillColor: '#ffff00',
			fillOpacity: 0.2,
			strokeWeight: 0,
			clickable: false,
			editable: false,
			zIndex: 1
		},
		polygonOptions: {
			fillColor: '#ffff00',
			fillOpacity: 0.2,
			strokeWeight: 0,
			clickable: false,
			editable: false,
			zIndex: 1 
		},
		rectangleOptions: {
			fillColor: '#ffff00',
			fillOpacity: 0.2,
			strokeWeight: 0,
			clickable: false,
			editable: false,
			zIndex: 1 
		}
	});
	drawingManager.setMap(map);	
}


function setMapCenterToCenterOfMass(map, tips){
	lat_mean=0;
	lon_mean=0;
	N=tips.length;
	for(var i=0;i<N;i++)
	{
		lat_mean = lat_mean+tips[i].lat/N;
		lon_mean = lon_mean+tips[i].lon/N;
	}
	var centerCoord = new google.maps.LatLng(lat_mean, lon_mean);
	map.setCenter(centerCoord);
}


function addWmsLayers(map)
{
	//http://www.sumbera.com/lab/GoogleV3/tiledWMSoverlayGoogleV3.htm
	//Define OSM as base layer in addition to the default Google layers

	var osmMapType = new google.maps.ImageMapType({
		getTileUrl: function (coord, zoom) {
			return "http://tile.openstreetmap.org/" +
			zoom + "/" + coord.x + "/" + coord.y + ".png";
		},
		tileSize: new google.maps.Size(256, 256),
		isPng: true,
		alt: "OpenStreetMap",
		name: "OSM",
		maxZoom: 19
	});



	//Define custom WMS tiled layer
	var SLPLayer = new google.maps.ImageMapType({
		getTileUrl: function (coord, zoom) {
			var proj = map.getProjection();
			var zfactor = Math.pow(2, zoom);

			// get Long Lat coordinates
			var top = proj.fromPointToLatLng(new google.maps.Point(coord.x * 256 / zfactor, coord.y * 256 / zfactor));
			var bot = proj.fromPointToLatLng(new google.maps.Point((coord.x + 1) * 256 / zfactor, (coord.y + 1) * 256 / zfactor));

			//corrections for the slight shift of the SLP (mapserver)
			var deltaX = 0.0013;
			var deltaY = 0.00058;


			//create the Bounding box string
			var bbox =     (top.lng() + deltaX) + "," +
			(bot.lat() + deltaY) + "," +
			(bot.lng() + deltaX) + "," +
			(top.lat() + deltaY);


			//http://onearth.jpl.nasa.gov/wms.cgi?request=GetCapabilities
			//base WMS URL
			var url = "http://mapserver-slp.mendelu.cz/cgi-bin/mapserv?map=/var/local/slp/krtinyWMS.map&";
			url += "&REQUEST=GetMap"; //WMS operation
			url += "&SERVICE=WMS";    //WMS service
			url += "&VERSION=1.1.1";  //WMS version  
			url += "&LAYERS=" + "typologie,hm2003"; //WMS layers
			url += "&FORMAT=image/png" ; //WMS format
			url += "&BGCOLOR=0xFFFFFF";  
			url += "&TRANSPARENT=TRUE";
			url += "&SRS=EPSG:4326";     //set WGS84 
			url += "&BBOX=" + bbox;      // set bounding box
			url += "&WIDTH=256";         //tile size in google
			url += "&HEIGHT=256";

			return url;                 // return URL for the tile
		},

		tileSize: new google.maps.Size(256, 256),

		isPng: true

	});

	map.mapTypes.set('OSM', osmMapType);

	map.setMapTypeId(google.maps.MapTypeId.ROADMAP);

	//add WMS layer

	map.overlayMapTypes.push(SLPLayer);


}

