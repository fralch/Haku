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
   		 
   		 //Aqui pegas waypoingts ()

   		 	
   		 	//obteniendo posicion del click
   		 	var latitudx = e.latLng.lat();
			var longitudx = e.latLng.lng();
					
			//Puedo unirlas en una unica variable si asi lo prefiero
			var coordenadas = e.latLng.lat() + ", " + e.latLng.lng();
					
			//Las muestro con un popup
			console.log(coordenadas);

			medir(latitudx,longitudx);

				

  	});// fin de click

}


function medir(latx,lony) {
	var capillas={ 
			libertad : new google.maps.LatLng(-12.066235471981807, -75.20984351634979),
			central : new google.maps.LatLng(-12.071019690031068, -75.21696746349335),	
			sancarlos : new google.maps.LatLng(-12.053267293663202, -75.19913613796234),	
			florida : new google.maps.LatLng (-12.066854487600306, -75.22723495960236),
			chilca : new google.maps.LatLng(-12.076370358674138,  -75.1973444223404),
			esquinas : new google.maps.LatLng(-12.053036463452461, -75.21278321743011),
			mantaro : new google.maps.LatLng(-12.049783825802876, -75.22720277309418),
			pilcomayo : new google.maps.LatLng(-12.055533623023129, -75.2604728937149),
			chupaca : new google.maps.LatLng(-12.062605284758021, -75.28371155261993),
			manti : new google.maps.LatLng(-12.022773870051635, -75.23734420537949)
		}
		

		//var origen = new google.maps.LatLng(-12.064387335184453, -75.21268799901009);

		var origen = new google.maps.LatLng(latx,lony);
	
		var med=500000000.5;

		for (var i in capillas) {
 			var med_aux = google.maps.geometry.spherical.computeDistanceBetween( origen, capillas[i] );
 			console.log(med_aux);

 			if (med_aux < med) {
 				med = med_aux;
 				var fin =  capillas[i];
 				
 			};
		};
		console.log('este es :'+med+' metros');
}

