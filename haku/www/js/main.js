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
	//------------estilos --------
	//var styles = [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}]
	var styles =[{"featureType":"administrative","elementType":"all","stylers":[{"visibility":"on"},{"lightness":33}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2e5d4"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#c5dac6"}]},{"featureType":"poi.park","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":20}]},{"featureType":"road","elementType":"all","stylers":[{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#c5c6c6"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#e4d7c6"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#fbfaf7"}]},{"featureType":"water","elementType":"all","stylers":[{"visibility":"on"},{"color":"#acbcc9"}]}]
	var styledMap = new google.maps.StyledMapType(styles, {name: "Styled Map"});

	//---------fin estilos---------

	var posicion = {
		lat: rta.coords.latitude,
		lng: rta.coords.longitude
	}

	var opcionesMapa = {
		center: posicion,
		zoom: 16,
		// mapTypecontrol ayuda a fijar stilo de mapa
		mapTypeControlOptions: {
      	mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
    	}
	}
	var mapa= new google.maps.Map(document.getElementById('mapa'),opcionesMapa);

	var maker= new google.maps.Marker({
		position: posicion,
		map: mapa
	});

	  var contentString = '<p>ESTAS AQUI</p>';

	  var infowindow = new google.maps.InfoWindow({
	    content: contentString
	  });

	  $( document ).ready(function() {
		    infowindow.open(mapa, maker);
		});
	



	// aqui comienza el click
	mapa.addListener('click', function(e) { //inicio de click

		//----- seteando estilo de mapa --------
		mapa.mapTypes.set('map_style', styledMap);
  		mapa.setMapTypeId('map_style');
		//--------- fin estilo mapa ------
   			
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
			
			var maker2= new google.maps.Marker({
				position: coordgeo,
				map: mapa
			});	

			//Las muestro con un popup
			console.log(coordenadas);

			medir(latitudx,longitudx);


//-------------------------------------------------------------------
	//GRAFICANDO LAS RUTAS POR MEDIO DE LOS IF

			//guardando los nombres de las rutas en los i's
			
			var i1 = (localStorage.getItem('nombre_1'));
			var i2 = (localStorage.getItem('nombre_2'));
			var i3 = (localStorage.getItem('nombre_3'));
			var i4 = (localStorage.getItem('nombre_4'));
			
			
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
					
					$( "#txt_info #nombreruta"  ).text( rutas[i1].datos.n_ruta);
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
					$( "#txt_info #nombreruta"  ).text( rutas[i1].datos.n_ruta);
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
					$( "#txt_info #nombreruta"  ).text( rutas[i1].datos.n_ruta);
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
					$( "#txt_info #nombreruta"  ).text( rutas[i1].datos.n_ruta);
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

			/*
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
			
			*/
			var bande1 =0;
			for (var z in rutas[x].waypts) {

				var waypts_r = rutas[x].waypts[z].location;

				var medida_waypts = google.maps.geometry.spherical.computeDistanceBetween(waypts_r, coordgeo)

				var lugarway = x;
				
				//console.log(medida_waypts);
				if (medida_waypts < med3) {
					med3 = medida_waypts;
					nomb_e = lugarway;
				}else if (medida_waypts < med2 || bande1 == 0) {
					med2 = medida_waypts;
					bande1++;
					nomb_b = lugarway;
				}else if (medida_waypts < med1 || bande1 == 1) {
					med1 = medida_waypts;
					nomb_a = lugarway;
				}
				
			}
			

		}
		
		/*
		console.log(med3+ 'nombre es '+nomb_e);
		console.log(med2+ 'nombre es '+nomb_b);
		console.log(med1+ 'nombre es '+nomb_a);
		//console.log('medida inicio'+nomb_a);
		

		if (medx<med3) {
				medf = medx;
		} else if (med3 < medx) {
				medf = med3;
		};
		//console.log(medf);
		*/
		graf_rutas(nomb_e, nomb_b,nomb_a,nomb_e);
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

				//----------------------------------------------------
				tm01: {//inicio
					inicio: {lat: -12.078405682575637, lng:-75.2301424741745},
					final: {lat: -12.056876622960312, lng: -75.2032881975174},
					waypts: [ //el numero de waypoints maximo es 8
								{location: new google.maps.LatLng(-12.070100623078728,-75.21495848894119)},
								{location: new google.maps.LatLng(-12.071475025471134,-75.21365493535995)},
								{location: new google.maps.LatLng(-12.067752581966475,-75.2076481282711)},
								{location: new google.maps.LatLng(-12.069696169742405,-75.20637944340706)},
								{location: new google.maps.LatLng(-12.067692254453785,-75.20296767354012)},
								{location: new google.maps.LatLng(-12.062834533488468,-75.20554259419441)},
								{location: new google.maps.LatLng(-12.06155608806243,-75.20387828350067)},
								{location: new google.maps.LatLng(-12.058691761493174,-75.20386755466461)}
							],
					imagen: "http://cdn.lopezdoriga.com/wp-content/uploads/2016/05/Transporte-de-Lujo-Guadalajara-2.jpg",
					datos: 	{
								n_ruta: 'TM-01 (EX TM-04)',
								nombre: 'La Rivera',
								lorem1: 'Uñas',
								lorem2: 'Huancayo',
							}
					  },// fin 
				//---------------------------------------------------------	
				//----------------------------------------------------
				tm01a: {//inicio
					inicio: {lat: -12.059393157654096, lng:-75.20347461104393},
					final: {lat: -12.024568253149075, lng: -75.18422573804855},
					waypts: [ //el numero de waypoints maximo es 8
								{location: new google.maps.LatLng(-12.053770923921896,-75.20054161548615)},
								{location: new google.maps.LatLng(-12.04933160074027,-75.19602745771408)},
								{location: new google.maps.LatLng(-12.044033904768465,-75.19395411014557)},
								{location: new google.maps.LatLng(-12.038871462589661,-75.19225895404816)},
								{location: new google.maps.LatLng(-12.033341666032953,-75.18987715244293)},
								{location: new google.maps.LatLng(-12.029238838328393,-75.18818199634552)},
								{location: new google.maps.LatLng(-12.024223020178008,-75.18590748310089)},
								{location: new google.maps.LatLng(-12.024568253149075,-75.18422573804855)}
							],
					imagen: "http://cdn.lopezdoriga.com/wp-content/uploads/2016/05/Transporte-de-Lujo-Guadalajara-2.jpg",
					datos: 	{
								n_ruta: 'TM-01 (EX TM-04)',
								nombre: 'La Rivera',
								lorem1: 'Uñas',
								lorem2: 'Huancayo',
							}
					  },// fin 
				//---------------------------------------------------------	
				


				//----------------------------------------------------
				tm01v: {//inicio
					inicio: {lat: -12.024726704886781, lng: -75.18605768680573},
					final: {lat: -12.078489613145834, lng: -75.23031413555145},
					waypts: [ //el numero de waypoints maximo es 8
								{location: new google.maps.LatLng(-12.057841900472331,-75.2040284872055)},
								{location: new google.maps.LatLng(-12.06001376217287,-75.20446836948395)},
								{location: new google.maps.LatLng(-12.064440318844069,-75.20235747098923)},
								{location: new google.maps.LatLng(-12.070278980799063,-75.21363884210587)},
								{location: new google.maps.LatLng(-12.071114113884203,-75.21683871746063)},
								{location: new google.maps.LatLng(-12.073044562900256,-75.22020757198334)},
								{location: new google.maps.LatLng(-12.075405147409509,-75.22467076778412)},
								{location: new google.maps.LatLng(-12.077283108670045,-75.22809326648712)}
							],
					imagen: "http://cdn.lopezdoriga.com/wp-content/uploads/2016/05/Transporte-de-Lujo-Guadalajara-2.jpg",
					datos: 	{
								n_ruta: 'TM-01 (EX TM-04)',
								nombre: 'Uñas',
								lorem1: 'La Rivera',
								lorem2: 'Huancayo',
							}
					  },// fin 
				//---------------------------------------------------------	


				//----------------------------------------------------
				tm02: {//inicio
					inicio: {lat: -12.053456155761383, lng: -75.23531377315521},
					final: {lat: -12.070341930639128, lng: -75.20171910524368},
					waypts: [ //el numero de waypoints maximo es 8
								{location: new google.maps.LatLng(-12.061822584866428,-75.23251622915268)},
								{location: new google.maps.LatLng(-12.058271028660178,-75.22862166166306)},
								{location: new google.maps.LatLng(-12.064996387687463,-75.22372931241989)},
								{location: new google.maps.LatLng(-12.06270390908722,-75.21927148103714)},
								{location: new google.maps.LatLng(-12.076253903855136,-75.21096736192703)},
								{location: new google.maps.LatLng(-12.074213317375902,-75.20698696374893)},
								{location: new google.maps.LatLng(-12.073137937783263,-75.20494312047958)},
								{location: new google.maps.LatLng(-12.072046816515927,-75.20267933607101)}
							],
					imagen: "http://cdn.lopezdoriga.com/wp-content/uploads/2016/05/Transporte-de-Lujo-Guadalajara-2.jpg",
					datos: 	{
								n_ruta: 'RUTA: TM-02 (EX TM-06)',
								nombre: 'Brisas del Mantaro',
								lorem1: 'Huancayo',
								lorem2: 'Huancayo',
							}
					  },// fin 
				//---------------------------------------------------------	
				
				//----------------------------------------------------
				tm02v: {//inicio
					inicio: {lat: -12.071974424883384, lng: -75.20485460758209},
					final: {lat: -12.055858880952107, lng: -75.2345198392868},
					waypts: [ //el numero de waypoints maximo es 8
								{location: new google.maps.LatLng(-12.072665818789723,-75.20649343729019)},
								{location: new google.maps.LatLng(-12.068458675180855,-75.20922392606735)},
								{location: new google.maps.LatLng(-12.070656679937718,-75.214384496212)},
								{location: new google.maps.LatLng(-12.064923993990206,-75.21785795688629)},
								{location: new google.maps.LatLng(-12.062920042341737,-75.21975696086884)},
								{location: new google.maps.LatLng(-12.06490301028763,-75.22390902042389)},
								{location: new google.maps.LatLng(-12.059709492752505,-75.22763192653656)},
								{location: new google.maps.LatLng(-12.058586840525193,-75.23375809192657)}
							],
					imagen: "http://cdn.lopezdoriga.com/wp-content/uploads/2016/05/Transporte-de-Lujo-Guadalajara-2.jpg",
					datos: 	{
								n_ruta: 'RUTA: TM-02 (EX TM-06)',
								nombre: 'Huancayo',
								lorem1: 'Brisas del Mantaro',
								lorem2: 'Huancayo',
							}
					  },// fin 
				//---------------------------------------------------------	


				//----------------------------------------------------
				tm03: {//inicio
					inicio: {lat: -12.064546286452064, lng:-75.22992789745331},
					final: {lat: -12.057264835373637, lng: -75.18894374370575},
					waypts: [ //el numero de waypoints maximo es 8
								{location: new google.maps.LatLng(-12.059010721239936,-75.22170692682266)},
								{location: new google.maps.LatLng(-12.074685434122166,-75.21188467741013)},
								{location: new google.maps.LatLng(-12.072403529726902,-75.20772188901901)},
								{location: new google.maps.LatLng(-12.069413418998609,-75.20206242799759)},
								{location: new google.maps.LatLng(-12.065200978326118,-75.20393460988998)},
								{location: new google.maps.LatLng(-12.063780379164545,-75.2011638879776)},
								{location: new google.maps.LatLng(-12.062069145780827,-75.19784599542618)},
								{location: new google.maps.LatLng(-12.05928876255667,-75.19703596830368)}
							],
					imagen: "http://cdn.lopezdoriga.com/wp-content/uploads/2016/05/Transporte-de-Lujo-Guadalajara-2.jpg",
					datos: 	{
								n_ruta: 'TM-03 (EX TM-07)',
								nombre: 'Urb. La Florida',
								lorem1: 'Cerrito La Libertad',
								lorem2: 'Huancayo',
							}
					  },// fin 
				//---------------------------------------------------------	

				//----------------------------------------------------
				tm03v: {//inicio
					inicio: {lat: -12.060234094985915, lng:-75.19384682178497},
					final: {lat: -12.066480980074797, lng: -75.22893279790878},
					waypts: [ //el numero de waypoints maximo es 8
								{location: new google.maps.LatLng(-12.067419993629134,-75.20783990621567)},
								{location: new google.maps.LatLng(-12.06853211707834,-75.20737320184708)},
								{location: new google.maps.LatLng(-12.072214681935733,-75.213483273983)},
								{location: new google.maps.LatLng(-12.059004950722695,-75.22183164954185)},
								{location: new google.maps.LatLng(-12.059844316008688,-75.2233524620533)},
								{location: new google.maps.LatLng(-12.06211058931808,-75.22551164031029)},
								{location: new google.maps.LatLng(-12.063327304304684,-75.22850632667542)},
								{location: new google.maps.LatLng(-12.066480980074797,-75.22893279790878)}
							],
					imagen: "http://cdn.lopezdoriga.com/wp-content/uploads/2016/05/Transporte-de-Lujo-Guadalajara-2.jpg",
					datos: 	{
								n_ruta: 'TM-03 (EX TM-07)',
								nombre: 'Cerrito La Libertad',
								lorem1: 'Urb. La Florida',
								lorem2: 'El Tambo',
							}
					  },// fin 
				//---------------------------------------------------------	

				//----------------------------------------------------
				tm04: {//inicio
					inicio: {lat: -12.03629440206177, lng:-75.22728592157364},
					final: {lat: -12.179065652993014, lng: -75.20025730133057},
					waypts: [ //el numero de waypoints maximo es 8
								{location: new google.maps.LatLng(-12.051503006841886,-75.21480157971382)},
								{location: new google.maps.LatLng(-12.052895866126015,-75.21678641438484)},
								{location: new google.maps.LatLng(-12.059067903850652,-75.21223470568657)},
								{location: new google.maps.LatLng(-12.05881347078923,-75.21123960614204)},
								{location: new google.maps.LatLng(-12.082228169817771,-75.20191088318825)},
								{location: new google.maps.LatLng(-12.089263984117762,-75.21267592906952)},
								{location: new google.maps.LatLng(-12.110622595829659,-75.21632373332977)},
								{location: new google.maps.LatLng(-12.179065652993014,-75.20025730133057)}
							],
					imagen: "http://cdn.lopezdoriga.com/wp-content/uploads/2016/05/Transporte-de-Lujo-Guadalajara-2.jpg",
					datos: 	{
								n_ruta: 'TM-04 (EX TM-11)',
								nombre: 'Umuto',
								lorem1: 'Mayopampa',
								lorem2: 'Viques',
							}
					  },// fin 
				//---------------------------------------------------------	
				
				//----------------------------------------------------
				tm04v: {//inicio
					inicio: {lat: -12.179317329092772, lng:-75.20008563995361},
					final: {lat: -12.03072887506795, lng: -75.21581947803497},
					waypts: [ //el numero de waypoints maximo es 8
								{location: new google.maps.LatLng(-12.088984923799615,-75.21266788244247)},
								{location: new google.maps.LatLng(-12.082155255626366,-75.20185858011246)},
								{location: new google.maps.LatLng(-12.068348511856646,-75.20410090684891)},
								{location: new google.maps.LatLng(-12.056644222412931,-75.20908579230309)},
								{location: new google.maps.LatLng(-12.058374900556993,-75.21135091781616)},
								{location: new google.maps.LatLng(-12.04583234354644,-75.2175173163414)},
								{location: new google.maps.LatLng(-12.036332178736922,-75.22734224796295)},
								{location: new google.maps.LatLng(-12.033520048425716,-75.22159159183502)}
							],
					imagen: "http://cdn.lopezdoriga.com/wp-content/uploads/2016/05/Transporte-de-Lujo-Guadalajara-2.jpg",
					datos: 	{
								n_ruta: 'TM-04 (EX TM-11)',
								nombre: 'Umuto',
								lorem1: 'Mayopampa',
								lorem2: 'Viques',
							}
					  },// fin 
				//---------------------------------------------------------	
				//----------------------------------------------------
				tm05: {//inicio
					inicio: {lat: -12.027107649405655, lng:-75.23671120405197},
					final: {lat: -12.105461436332577, lng: -75.20532667636871},
					waypts: [ //el numero de waypoints maximo es 8
								{location: new google.maps.LatLng(-12.04338230988305,-75.2257838845253)},
								{location: new google.maps.LatLng(-12.041441154612349,-75.22235602140427)},
								{location: new google.maps.LatLng(-12.070327242568547,-75.20473659038544)},
								{location: new google.maps.LatLng(-12.074083223287737,-75.2050369977951)},
								{location: new google.maps.LatLng(-12.076265444787037,-75.20543396472931)},
								{location: new google.maps.LatLng(-12.080021342070863,-75.208620429039)},
								{location: new google.maps.LatLng(-12.086556267523711,-75.20826369524002)},
								{location: new google.maps.LatLng(-12.08993959474384,-75.20780235528946)}
							],
					imagen: "http://cdn.lopezdoriga.com/wp-content/uploads/2016/05/Transporte-de-Lujo-Guadalajara-2.jpg",
					datos: 	{
								n_ruta: 'TM-05 (EX TM-12)',
								nombre: 'La Victoria - El Tambo',
								lorem1: 'Huari',
								lorem2: 'Huancan',
							}
					  },// fin 
				//---------------------------------------------------------	

				//----------------------------------------------------
				tm05v: {//inicio
					inicio: {lat: -12.105461436332577, lng:-75.20532667636871},
					final: {lat: -12.027161165120605, lng: -75.23650467395782},
					waypts: [ //el numero de waypoints maximo es 8
								{location: new google.maps.LatLng(-12.080545903897093,-75.208620429039)},
								{location: new google.maps.LatLng(-12.059038000396297,-75.21090567111969)},
								{location: new google.maps.LatLng(-12.053907324261345,-75.21334111690521)},
								{location: new google.maps.LatLng(-12.050770113641708,-75.21485388278961)},
								{location: new google.maps.LatLng(-12.04585962324198,-75.21750390529633)},
								{location: new google.maps.LatLng(-12.043173505269765,-75.22603332996368)},
								{location: new google.maps.LatLng(-12.031232545029457,-75.23380100727081)},
								{location: new google.maps.LatLng(-12.027161165120605,-75.23650467395782)}
							],
					imagen: "http://cdn.lopezdoriga.com/wp-content/uploads/2016/05/Transporte-de-Lujo-Guadalajara-2.jpg",
					datos: 	{
								n_ruta: 'TM-05 (EX TM-12)',
								nombre: 'Huari',
								lorem1: 'La Victoria - El Tambo',
								lorem2: 'Huancan',
							}
					  },// fin 
				//---------------------------------------------------------	
				//----------------------------------------------------
				tm06: {//inicio
					inicio: {lat: -12.07837630763825, lng:-75.23009419441223},
					final: {lat: -12.024296474256776, lng: -75.18591821193695},
					waypts: [ //el numero de waypoints maximo es 8
								{location: new google.maps.LatLng(-12.071511746049044,-75.21374076604843)},
								{location: new google.maps.LatLng(-12.069691448565573,-75.20635932683945)},
								{location: new google.maps.LatLng(-12.067597828754476,-75.20297035574913)},
								{location: new google.maps.LatLng(-12.06279413916048,-75.20538032054901)},
								{location: new google.maps.LatLng(-12.06032747433203,-75.20453542470932)},
								{location: new google.maps.LatLng(-12.057898558213653,-75.20405262708664)},
								{location: new google.maps.LatLng(-12.047674835815219,-75.19510209560394)},
								{location: new google.maps.LatLng(-12.039647933809384,-75.19254863262177)}
							],
					imagen: "http://cdn.lopezdoriga.com/wp-content/uploads/2016/05/Transporte-de-Lujo-Guadalajara-2.jpg",
					datos: 	{
								n_ruta: 'TM-05 (EX TM-12)',
								nombre: 'Huari',
								lorem1: 'La Victoria - El Tambo',
								lorem2: 'Huancan',
							}
					  }// fin 
				//---------------------------------------------------------	
};

