var obj= navigator.geolocation.getCurrentPosition(fn_ok, fn_mal);
var coordgeo;
var b1 = 1;

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

	mapa.addListener('click', function clicky(e) { //inicio de click
   			
   		$("#botones").css({"display": "inline-block"}); 
   		$("#info").css({"display": "block"}); 
   		$("#mapa").css({"height": "90%"}); 
   		//$("#info img").css({"margin-top": "30%"}); 


   		// Limpiando el localstorage	 
   		 localStorage.removeItem('nombre_1');
   		 localStorage.removeItem('nombre_2');
   		 localStorage.removeItem('nombre_3');
   		 localStorage.removeItem('nombre_4');
   		
   		 
   		 	
   		 	//obteniendo posicion del click
   		 	var latitudx = e.latLng.lat();
			var longitudx = e.latLng.lng();
					
			//Puedo unirlas en una unica variable si asi lo prefiero
			var coordenadas = e.latLng.lat() + ", " + e.latLng.lng();
			coordgeo = new google.maps.LatLng(e.latLng.lat(), e.latLng.lng());
					
			//Las muestro con un popup
			console.log(coordenadas);

			medir(latitudx,longitudx);

//-------------------------------------------------------------------
	//GRAFICANDO LAS RUTAS POR MEDIO DE LOS IF

			//guardando los nombres de las rutas en los i's
			
			var i4 = (localStorage.getItem('nombre_1'));
			var i3 = (localStorage.getItem('nombre_2'));
			var i2 = (localStorage.getItem('nombre_3'));
			var i1 = (localStorage.getItem('nombre_4'));
			
			
				if (b1 == 1) {// es la b1 es la bandera que cuenta los clicks y segun a ello grafica la ruta
					//console.log('del local es '+i1);

					var objConfDR = { 
					map: mapa,
					suppressMarkers: true
					}
					var destino = rutas[i1].final;
					
					var objConfDS = {
						origin:rutas[i1].inicio,
						destination: destino,
						waypoints:rutas[i1].waypts,
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
					//
					$( "#info img" ).attr( "src", rutas[i1].imagen );
					//$( "p" ).text( "<b>Some</b> new text." );
					$( "#txt_info #ubi"  ).text( rutas[i1].datos.nombre);
					$( "#txt_info #zona"  ).text( rutas[i1].datos.lorem1);
					$( "#txt_info #dist"  ).text( rutas[i1].datos.lorem2);
					

				}

				if (b1 == 2) {
					//console.log('del local es '+i2);

					var objConfDR = { 
					map: mapa,
					suppressMarkers: true
					}
					var destino = rutas[i2].final;
					
					var objConfDS = {
						origin:rutas[i2].inicio,
						destination: destino,
						waypoints:rutas[i2].waypts,
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

					//
					$( "#info img" ).attr( "src", rutas[i2].imagen );
					$( "#txt_info #ubi"  ).text( rutas[i2].datos.nombre);
					$( "#txt_info #zona"  ).text( rutas[i2].datos.lorem1);
					$( "#txt_info #dist"  ).text( rutas[i2].datos.lorem2);

				}
				if (b1 == 3) {
					//console.log('del local es '+i3);

					var objConfDR = { 
					map: mapa,
					suppressMarkers: true
					}
					var destino = rutas[i3].final;
					
					var objConfDS = {
						origin:rutas[i3].inicio,
						destination: destino,
						waypoints:rutas[i3].waypts,
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
					//
					$( "#info img" ).attr( "src", rutas[i3].imagen );
					$( "#txt_info #ubi"  ).text( rutas[i3].datos.nombre);
					$( "#txt_info #zona"  ).text( rutas[i3].datos.lorem1);
					$( "#txt_info #dist"  ).text( rutas[i3].datos.lorem2);
				}

				if (b1 == 4) {
					//console.log('del local es '+i4);

					var objConfDR = { 
					map: mapa,
					suppressMarkers: true
					}
					var destino = rutas[i4].final;
					
					var objConfDS = {
						origin:rutas[i4].inicio,
						destination: destino,
						waypoints:rutas[i4].waypts,
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
					//
					$( "#info img" ).attr( "src", rutas[i4].imagen );
					$( "#txt_info #ubi"  ).text( rutas[i4].datos.nombre);
					$( "#txt_info #zona"  ).text( rutas[i4].datos.lorem1);
					$( "#txt_info #dist"  ).text( rutas[i4].datos.lorem2);
				}
	

				b1 ++; //la bandera incrementa uno en cada click


//-------------------------------------------------------------------


  	});
  	// fin de click

}


function medir(latx,lony) {


		//var origen = new google.maps.LatLng(-12.064387335184453, -75.21268799901009);

		var origen = new google.maps.LatLng(latx,lony);
	
		var med1=500000000.5;
		var med2=500000000.5;
		var med3=500000000.5;
		var medx;
		var medf;

		var nomb_a;
		var nomb_b;
		var nomb_c;
		var nomb_e;

			

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
				nomb_c = lugar;
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
		
		/*
		console.log('medida way'+nomb_e);
		console.log('menor ini y fin'+nomb_c);
		console.log('medida final'+nomb_b);
		console.log('medida inicio'+nomb_a);
		*/

		if (medx<med3) {
				medf = medx;
		} else if (med3 < medx) {
				medf = med3;
		};
		//console.log(medf);
		
		graf_rutas(nomb_a, nomb_b,nomb_c,nomb_e);
};
//

function graf_rutas(a,b,c,e) {

	localStorage.setItem('nombre_1', a);
	localStorage.setItem('nombre_2', b);
	localStorage.setItem('nombre_3', c);
	localStorage.setItem('nombre_4', e);

}







//Json rutas
var rutas ={
				ucci: {//inicio
					inicio: {lat: -12.047208967661641, lng: -75.19922867417336},
					final: {lat: -12.06861605050217, lng: -75.21021097898483},
					waypts: [ //el numero de waypoints maximo es 8
								{location: new google.maps.LatLng(-12.051727018076974,-75.20204901695251)},
								{location: new google.maps.LatLng(-12.05703610331996,-75.20507454872131)},
								{location: new google.maps.LatLng(-12.060895092338846,-75.20760118961334)},
								{location: new google.maps.LatLng(-12.065919668405291,-75.20520597696304)},
								{location: new google.maps.LatLng(-12.067400058721029,-75.20796597003937)}
							],
					imagen: "http://cdn.lopezdoriga.com/wp-content/uploads/2016/05/Transporte-de-Lujo-Guadalajara-2.jpg",
					datos: 	{
								nombre: 'nombre de ruta ucci',
								lorem1: 'lorem++ ucci',
								lorem2: 'lorem++ ucci',
							}
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
							],
					imagen: "https://c1.staticflickr.com/9/8434/29667006776_d660361e91_z.jpg",
					datos: 	{
								nombre: 'nombre de ruta umuto',
								lorem1: 'lorem++ umuto',
								lorem2: 'lorem++ umuto',
							}
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
							],
					imagen: "http://cde.publimetro.e3.pe/ima/0/0/0/9/2/92711.jpg",
					datos: 	{
								nombre: 'nombre de ruta upla',
								lorem1: 'lorem++ upla',
								lorem2: 'lorem++ upla',
							}
					  }// fin 


}

