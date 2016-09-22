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
