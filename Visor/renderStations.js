// La función renderStations contiene la mayor parte de la lógida de la visualización.
// Se encarga de cargar la información necesaria dependiendo de la fecha seleccionada.
// Para ello, carga los datos de los ficheros csv de datos atmosféricos y de calidad del aire del año
// correspondiente.
// Con esos datos, va a dibujar los markers en el mapa y la información meteorológica necesaria.
function renderStations(fecha)
{
	for(i = 0; i < circles.length; i++) {
		map.removeLayer(circles[i]);
	}

	// Cargamos los datos de los ficheros csv. Lo primero es cargar la estaciones de control
	d3.dsv(";", "./data/estaciones_control_aire.csv").then(function(data) {
		data.forEach(function(d) {
			var latitud = d.LATITUD;
			var longitud = d.LONGITUD;
			var estacion = d.CODIGO_CORTO;
			var nom_estacion = d.ESTACION

			// Cargarmos el fichero con los datos para el año seleccionado
			var file_name = "./data/datos" + fecha.getFullYear() + "12.csv";
			d3.dsv(";", file_name).then(function(data) {
				var filteredData = data.filter(function(row, i) {
					var myMonth = ("0" + (fecha.getMonth() + 1)).slice(-2);
					return row.MES == myMonth && row.ESTACION == estacion && (row.MAGNITUD == '1' || row.MAGNITUD == '8' || row.MAGNITUD == '9' || row.MAGNITUD == '10' || row.MAGNITUD == '14');
				});

				var indice_calidad = 0;
				var valor_so2 = "No disponible";
				var valor_no2 = "No disponible";
				var valor_pm25 = "No disponible";
				var valor_pm10 = "No disponible";
				var valor_o3 = "No disponible";

				// Para cada coponente, guardamos su valor y actualizamos el índice de calidad del aire
				filteredData.forEach(function(item) {
					var magnitud = item.MAGNITUD;
					var myDay = ("0" + fecha.getDate()).slice(-2);
					var valor = item['D' + myDay];

					// Dióxido de Azufre SO2
					if (magnitud == 1) {
						valor_so2 = parseInt(valor, 10) + '&nbsp;&#956;g/m<sup>3</sup>';
						if (valor <= 50)
							indice_calidad = Math.max(indice_calidad, 0);
						else if (valor <= 100)
							indice_calidad = Math.max(indice_calidad, 1);
						else if (valor <= 350)
							indice_calidad = Math.max(indice_calidad, 2);
						else if (valor <= 500)
							indice_calidad = Math.max(indice_calidad, 3);
						else
							indice_calidad = 5;
					}

					// Dióxido de Nitrógeno NO2
					if (magnitud == 8) {
						valor_no2 = parseInt(valor, 10) + '&nbsp;&#956;g/m<sup>3</sup>';
						if (valor <= 50)
							indice_calidad = Math.max(indice_calidad, 0);
						else if (valor <= 100)
							indice_calidad = Math.max(indice_calidad, 1);
						else if (valor <= 200)
							indice_calidad = Math.max(indice_calidad, 2);
						else if (valor <= 40)
							indice_calidad = Math.max(indice_calidad, 3);
						else
							indice_calidad = 5;
					}

					// Partículas < 2.5 µm PM2.5
					if (magnitud == 9) {
						valor_pm25 = parseInt(valor, 10) + '&nbsp;&#956;g/m<sup>3</sup>';
						if (valor <= 15)
							indice_calidad = Math.max(indice_calidad, 0);
						else if (valor <= 30)
							indice_calidad = Math.max(indice_calidad, 1);
						else if (valor <= 55)
							indice_calidad = Math.max(indice_calidad, 2);
						else if (valor <= 110)
							indice_calidad = Math.max(indice_calidad, 3);
						else
							indice_calidad = 5;
					}

					// Partículas < 10 µm PM10
					if (magnitud == 10) {
						valor_pm10 = parseInt(valor, 10) + '&nbsp;&#956;g/m<sup>3</sup>';
						if (valor <= 25)
							indice_calidad = Math.max(indice_calidad, 0);
						else if (valor <= 50)
							indice_calidad = Math.max(indice_calidad, 1);
						else if (valor <= 90)
							indice_calidad = Math.max(indice_calidad, 2);
						else if (valor <= 180)
							indice_calidad = Math.max(indice_calidad, 3);
						else
							indice_calidad = 5;
					}

					// Ozono O3
					if (magnitud == 14) {
						valor_o3 = parseInt(valor, 10) + '&nbsp;&#956;g/m<sup>3</sup>';
						if (valor <= 60)
							indice_calidad = Math.max(indice_calidad, 0);
						else if (valor <= 120)
							indice_calidad = Math.max(indice_calidad, 1);
						else if (valor <= 180)
							indice_calidad = Math.max(indice_calidad, 2);
						else if (valor <= 240)
							indice_calidad = Math.max(indice_calidad, 3);
						else
							indice_calidad = 5;
					}

				});

				// Añadimos el círculo correspondiente a la estación con los datos correspondientes
				var colorCircle = "#6f6f6f";
				var aqi_text = "";
				switch (indice_calidad) {
					case 0:
						colorCircle = "#50f0e6";
						aqi_text = "Muy Bueno";
						break;
					case 1:
						colorCircle = "#50ccaa";
						aqi_text = "Bueno";
						break;
					case 2:
						colorCircle = "#f0e641";
						aqi_text = "Regular";
						break;
					case 3:
						colorCircle = "#ff5050";
						aqi_text = "Malo";
						break;
					case 4:
						colorCircle = "#960032";
						aqi_text = "Muy malo";
						break;
					case 5:
						colorCircle = "#7d2181";
						aqi_text = "Muy malo";
						break;
				} 
				var circle = L.circle([latitud, longitud], {radius: 200, color: colorCircle, opacity: 1, fillOpacity: 0.6}).addTo(map);

				circle.bindPopup(new L.popup().setContent('<div class="circlePopup"><span class="titulo_estacion">' + nom_estacion + '</span><br/><b>Indice de calidad:</b> ' + aqi_text + '<br/><b>Di&oacute;xido de Azufre (SO<sub>2</sub>):</b> ' + valor_so2 + '<br/><b>Di&oacute;xido de Nitr&oacute;geno (NO<sub>2</sub>):</b> ' + valor_no2 + '<br/><b>Part&iacute;culas &lt; 2.5 &#956;m (PM2.5):</b> ' + valor_pm25 + '<br/><b>Part&iacute;culas &lt; 10 &#956;m (PM10):</b> ' + valor_pm10 + '<br/><b>Ozono (O<sub>3</sub>):</b> ' + valor_o3 + '</div>'));

				circles.push(circle);
			});
		});
	});
}