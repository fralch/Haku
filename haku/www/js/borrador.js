var objConfDR = { 
			map: mapa,
			suppressMarkers: true
		}
		var destino = new google.maps.LatLng(-12.066235471981807, -75.20984351634979);
		
		var objConfDS = {
			origin:posicion,
			destination: destino,
			waypoints: [{location: new google.maps.LatLng(-12.06525343784135,-75.20898789167404)}],
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





// json 

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

				uncp: {//inicio
					inicio: {lat: -12.047208967661641, lng: -75.19922867417336},
					final: {lat: -12.06861605050217, lng: -75.21021097898483},
					waypts: [
								{location: new google.maps.LatLng(-12.051727018076974,-75.20204901695251)},
								{location: new google.maps.LatLng(-12.05703610331996,-75.20507454872131)},
								{location: new google.maps.LatLng(-12.060895092338846,-75.20760118961334)},
								{location: new google.maps.LatLng(-12.065919668405291,-75.20520597696304)},
								{location: new google.maps.LatLng(-12.067400058721029,-75.20796597003937)}
							]
					  }// fin 


}