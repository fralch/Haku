var obj= navigator.geolocation.getCurrentPosition(fn_ok, fn_mal);

function fn_mal() {
	console.log("algo salio mal");
	
	var rta = {coords:{
				latitude: -12.064355859406861,
				longitude: -75.21272018551826
				}};
	fn_ok(rta);
}

function fn_ok(rta) {

	var posicion = {
		lat: rta.coords.latitude,
		lng: rta.coords.longitude
	}

	var opcionesMapa = {
		center: posicion,
		zoom: 18
	}
	var mapa= new google.maps.Map(document.getElementById('mapa'),opcionesMapa);

	var maker= new google.maps.Marker({
		position: posicion,
		map: mapa
	});

	mapa.addListener('click', function(e) { //inicio de click
   		 

		var objConfDR = { 
			map: mapa,
			suppressMarkers: true
		}
		var destino = new google.maps.LatLng(-12.066235471981807, -75.20984351634979);
		
		var objConfDS = {
			origin:posicion,
			destination: destino,
			travelMode: google.maps.TravelMode.WALKING
		}

		var ds = new google.maps.DirectionsService();

		var dr = new google.maps.DirectionsRenderer(objConfDR);

		ds.route(objConfDS, fn_rutear);

		function fn_rutear(resultado, status) {
			if (status=='OK') {
				dr.setDirections(resultado);
			}else{
				console.log('error al trazar ruta');
			}
		}


  	});// fin de click

}