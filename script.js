$(".container").hide(); // hide on load
var celsiusOn = true; // if true, celsius is displayed
var celsius, fahrenheit, kelvin; // global declaration for access by multiple functions
var loadingIcon = '<svg width="158px" height="158px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="uil-default"><rect x="0" y="0" width="100" height="100" fill="none" class="bk"></rect><rect  x="46.5" y="40" width="7" height="20" rx="5" ry="5" fill="#333333" transform="rotate(0 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0s" repeatCount="indefinite"/></rect><rect  x="46.5" y="40" width="7" height="20" rx="5" ry="5" fill="#333333" transform="rotate(30 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.08333333333333333s" repeatCount="indefinite"/></rect><rect  x="46.5" y="40" width="7" height="20" rx="5" ry="5" fill="#333333" transform="rotate(60 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.16666666666666666s" repeatCount="indefinite"/></rect><rect  x="46.5" y="40" width="7" height="20" rx="5" ry="5" fill="#333333" transform="rotate(90 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.25s" repeatCount="indefinite"/></rect><rect  x="46.5" y="40" width="7" height="20" rx="5" ry="5" fill="#333333" transform="rotate(120 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.3333333333333333s" repeatCount="indefinite"/></rect><rect  x="46.5" y="40" width="7" height="20" rx="5" ry="5" fill="#333333" transform="rotate(150 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.4166666666666667s" repeatCount="indefinite"/></rect><rect  x="46.5" y="40" width="7" height="20" rx="5" ry="5" fill="#333333" transform="rotate(180 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.5s" repeatCount="indefinite"/></rect><rect  x="46.5" y="40" width="7" height="20" rx="5" ry="5" fill="#333333" transform="rotate(210 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.5833333333333334s" repeatCount="indefinite"/></rect><rect  x="46.5" y="40" width="7" height="20" rx="5" ry="5" fill="#333333" transform="rotate(240 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.6666666666666666s" repeatCount="indefinite"/></rect><rect  x="46.5" y="40" width="7" height="20" rx="5" ry="5" fill="#333333" transform="rotate(270 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.75s" repeatCount="indefinite"/></rect><rect  x="46.5" y="40" width="7" height="20" rx="5" ry="5" fill="#333333" transform="rotate(300 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.8333333333333334s" repeatCount="indefinite"/></rect><rect  x="46.5" y="40" width="7" height="20" rx="5" ry="5" fill="#333333" transform="rotate(330 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.9166666666666666s" repeatCount="indefinite"/></rect></svg>';
// svg element containing loading icon

$("#tempSwitch").click(function () {
	if (celsiusOn === true) {
		celsiusOn = false;
		$("#tempSwitch").html("&deg;C");
		$(".temperature").hide();
		$(".temperature").html(fahrenheit + "&deg;F");
		$(".temperature").fadeIn(500);
	} else {
		celsiusOn = true;
		$("#tempSwitch").html("&deg;F");
		$(".temperature").hide();
		$(".temperature").html(celsius + "&deg;C");
		$(".temperature").fadeIn(500);
	}
}); // button code for toggling celsius to fahrenheit, and vice versa

function decimalClipper (number) {
	number = number.toString(); // convert number to string
	number = number.split(""); // split string into array
	var decimalPosition = number.indexOf("."); // find index of decimal within array
	number = number.slice(0, decimalPosition+2); // slice from 0 up to 1 position past decimal
	number = number.join(""); // convert array to string
	return number;
} // shortens numbers to one decimal place

function geoSuccess (position) {
	$('.welcome').html(loadingIcon);
	$('.welcome').append('<div class="loading-message">Loading.</div>');
	$('.welcome').append('<div class="sub-loading-message">Please be patient. Due to API limitations, requests must be routed through a proxy.</div>');
	var longPos = position.coords.longitude; // store user longitude
	var latPos = position.coords.latitude; // store user latitude		
	var weatherURL = "http://api.openweathermap.org/data/2.5/weather?lat="+latPos+"&lon="+longPos+"&APPID=REDACTED"; // query string with user lat and lon inserted, as well as API key (REMOVED)
	$.getJSON(weatherURL, function(weatherResponse){
		$(".welcome").hide();
		kelvin = weatherResponse.main.temp; // store kelvin temperature in var
		celsius = kelvin - 273.15; // convert to celsius
		celsius = decimalClipper(celsius); // clip to one decimal place
		fahrenheit = kelvin * 9/5 - 459.67; // convert to fahrenheit
		fahrenheit = decimalClipper(fahrenheit); // clip to one decimal place
		$(".temperature").html(celsius + "&deg;C");
		$(".description").html(weatherResponse.weather[0].description + " " + '<img src="http://openweathermap.org/img/w/'+weatherResponse.weather[0].icon+'.png" />');
		$(".location").text(weatherResponse.name);


		var codeID = weatherResponse.weather[0].id; // store weather ID in var
		console.log(codeID);

		if (codeID > 956) {
			$(document.body).css("background", "radial-gradient(circle, #8b8b83 20%, #ababa1)");
			$(document.body).css("color", "#fff");
			$("#tempSwitch").css("border-color", "#fff");
			// WIND STORMS
		} else if (codeID > 950) {
			$(document.body).css("background", "radial-gradient(circle, #cdcdc1 20%, #eeeee0)");
			$(document.body).css("color", "#444");
			$("#tempSwitch").css("border-color", "#444");
			// LIGHT TO MODERATE WINDS
		} else if (codeID >= 900) {
			$(document.body).css("background", "radial-gradient(circle, #cd3700 20%, #ff4500)");
			$(document.body).css("color", "#fff");
			$("#tempSwitch").css("border-color", "#fff");
			//EXTREME
		} else if (codeID > 800) {
			$(document.body).css("background", "radial-gradient(circle, #cdcdc1 20%, #eeeee0)");
			$(document.body).css("color", "#444");
			$("#tempSwitch").css("border-color", "#444");
			// CLOUDS
		} else if (codeID == 800) {
			$(document.body).css("background", "radial-gradient(circle, #87ceeb 20%, #6ca6cd)");
			$(document.body).css("color", "#fff");
			$("#tempSwitch").css("border-color", "#fff");
			// CLEAR SKY
		} else if (codeID > 700) {
			$(document.body).css("background", "radial-gradient(circle, #eee5de 20%, #8b8682)");
			$(document.body).css("color", "#444");
			$("#tempSwitch").css("border-color", "#444");
			// ATMOSPHERE
		} else if (codeID >= 600) {
			$(document.body).css("background", "radial-gradient(circle, #eee9e9 20%, #8b8989)");
			$(document.body).css("color", "#444");
			$("#tempSwitch").css("border-color", "#444");
			// SNOW
		} else if (codeID >= 500) {
			$(document.body).css("background", "radial-gradient(circle, #b9d3ee 20%,#6c7b8b)");
			$(document.body).css("color", "#fff");
			$("#tempSwitch").css("border-color", "#fff");
			// RAIN
		} else if (codeID >= 300) {
			$(document.body).css("background", "radial-gradient(circle, #c6e2ff 20%, #9fb6cd)");
			$(document.body).css("color", "#444");
			$("#tempSwitch").css("border-color", "#444");
			// DRIZZLE
		} else if (codeID >= 200) {
			$(document.body).css("background", "radial-gradient(circle, #616161 20%, #292929)");
			$(document.body).css("color", "#fff");
			$("#tempSwitch").css("border-color", "#fff");
			// THUNDERSTORM
		} // if statements to style page based on weather type code

		$(".container").fadeIn(500); // fadeIn container div			
	});	// end getJSON
} // success function for html5 geo api

function geoFail (positionError) {
	$(".welcome").hide();
	if (positionError.code == 1) {
		console.log("PERMISSION_DENIED");
	} else if (positionError.code == 2) {
		console.log("POSITION_UNAVAILABLE");
	} else if (positionError.code == 3) {
		console.log("TIMEOUT");
	} else {
		console.log("Miscellaneous error.");
	}
} // error function for html5 geo api

// check if user browser supports geolocation
if ("geolocation" in navigator) {
 		navigator.geolocation.getCurrentPosition(geoSuccess, geoFail);
} else {
   $(".welcome").text("Geolocation is not supported in this browser.");
   console.log("FAIL");
}