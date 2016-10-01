var obj= navigator.geolocation.getCurrentPosition(fn_ok, fn_mal);
var coordgeo;

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
		zoom: 16
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
			coordgeo = new google.maps.LatLng(e.latLng.lat(), e.latLng.lng());
					
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
	
		var med1=500000000.5;
		var med2=500000000.5;
		var med3=500000000.5;
		var medx;
		var medf;
		var band1;
		var band2;

		var nomb_a;
		var nomb_b;
		var nomb_c;
		var nomb_d;
		var nomb_e;
		var nomb_x;
		var nomb_y;

		/*
		for (var i in capillas) {
 			var med_aux = google.maps.geometry.spherical.computeDistanceBetween( origen, capillas[i] );
 			//console.log(med_aux);

 			if (med_aux < med1) {
 				med1 = med_aux;
 				band1 = capillas[i];
 				
 			};
		};*/




		//console.log('este es :'+med1+' metros');
		//console.log(band1)
			

		for (var x in rutas) {


			//console.log(rutas[x].inicio);
			//console.log(rutas[x].final);
			//console.log(rutas[x].waypts);
			
			//-- inicio_r toma las coordenadas de los inicio de json rutas y crea un objeto de google
			var inicio_r = new google.maps.LatLng(rutas[x].inicio.lat,rutas[x].inicio.lng);

			//-- final_r toma las coordenadas de los final de json rutas y crea un objeto de google
			var final_r = new google.maps.LatLng(rutas[x].final.lat,rutas[x].final.lng);

			//medida_inicio: mide la distancia de inicio y las coordenadas obtenidas
			var medida_inicio = google.maps.geometry.spherical.computeDistanceBetween(inicio_r, coordgeo);
			//console.log(medida_inicio);
			
			//-- medida_final: mide la distancia de final y las coordenadas obtenidas
			var medida_final = google.maps.geometry.spherical.computeDistanceBetween(final_r, coordgeo);
			//console.log(medida_final);

			//console.log('esto es '+x);
			var lugar = x;
			
			if (medida_inicio < med1) {
				med1 = medida_inicio;
				nomb_a = lugar;

			}
			
			//console.log('la medida menor es '+med1);

			if (medida_final < med2) {
				med2 = medida_final;
				nomb_b = lugar;
			}
			//console.log('la medida menor es '+med2);

			if (med1<med2) {
				medx = med1;
				nomb_c = lugar;
			} else if (med2 < med1) {
				medx = med2;
				nomb_d = lugar;
			}
			

			for (var z in rutas[x].waypts) {

				var waypts_r = rutas[x].waypts[z].location;

				var medida_waypts = google.maps.geometry.spherical.computeDistanceBetween(waypts_r, coordgeo)

				var lugarway = x;
				//console.log(medida_waypts);
				if (medida_waypts < med3) {
					med3 = medida_waypts;
					nomb_e = lugarway;
				}
				
			}
			

		}
		console.log(nomb_a);
		console.log(nomb_b);
		console.log(nomb_c);
		console.log(nomb_d);
		console.log(nomb_e);

		if (medx<med3) {
				medf = medx;
		} else if (med3 < medx) {
				medf = med3;
		};
		//console.log(medf);
		
};


//Json rutas
var rutas ={
				ucci: {//inicio
					inicio: {lat: -12.047208967661641, lng: -75.19922867417336},
					final: {lat: -12.06861605050217, lng: -75.21021097898483},
					waypts: [
								{location: new google.maps.LatLng(-12.051727018076974,-75.20204901695251)},
								{location: new google.maps.LatLng(-12.05703610331996,-75.20507454872131)},
								{location: new google.maps.LatLng(-12.060895092338846,-75.20760118961334)},
								{location: new google.maps.LatLng(-12.065919668405291,-75.20520597696304)},
								{location: new google.maps.LatLng(-12.067400058721029,-75.20796597003937)}
							]
					  },// fin 

				umuto: {//inicio
					inicio: {lat: -12.04297624253849, lng: -75.22020220756531},
					final: {lat: -12.071041722159718, lng: -75.20458236336708},
					waypts: [
								{location: new google.maps.LatLng(-12.045765190017212,-75.21754682064056)},
								{location: new google.maps.LatLng(-12.05122128649754,-75.21463930606842)},
								{location: new google.maps.LatLng(-12.056289061675328,-75.21277248859406)},
								{location: new google.maps.LatLng(-12.059598277523511,-75.21204024553299)},
								{location: new google.maps.LatLng(-12.05923682578966,-75.21102704107761)},
								{location: new google.maps.LatLng(-12.06387060983608,-75.20765617489815)},
								{location: new google.maps.LatLng(-12.06822261122515,-75.2053239941597)}
							]
					  },// fin 

				upla: {//inicio
					inicio: {lat: -12.039636392262452, lng: -75.19255667924881},
					final: {lat: -12.069895511165358, lng: -75.2126906812191},
					waypts: [
								{location: new google.maps.LatLng(-12.043467300749152,-75.19378244876862)},
								{location: new google.maps.LatLng(-12.050612727367389,-75.19740879535675)},
								{location: new google.maps.LatLng(-12.057096958990918,-75.20339548587799)},
								{location: new google.maps.LatLng(-12.059078920086206,-75.20272225141525)},
								{location: new google.maps.LatLng(-12.060259276443654,-75.20300656557083)},
								{location: new google.maps.LatLng(-12.063684903153375,-75.20156353712082)},
								{location: new google.maps.LatLng(-12.06633094724462,-75.20606562495232)},
								{location: new google.maps.LatLng(-12.068557821653664,-75.21020159125328)}
							]
					  }// fin 


}