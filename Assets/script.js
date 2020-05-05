//------------------Variables------------------------

var APIKey = 'be2657f4805264720d4f2be16afc80a4';
var queryURL = 'https://api.openweathermap.org/data/2.5/forecast?q=' + cityInput + '&appid=' + APIKey

var cityInput = $('#cityInput');
var searchBtn = $('#searchBtn');

//-------------------Calling to the OpenWeatherMap API ------------------

$(searchBtn).on('click', function () {
    cityInput = $('#cityInput').val();
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            console.log(queryURL);
            console.log(response);


            $("#city").html("<h1>" + response.name + " Weather Details</h1>"); 
                $("#wind").text("Wind Speed: " + response.wind.speed);
                $("#humidity").text("Humidity: " + response.main.humidity);

            var tempF = (response.main.temp - 273.15) * 1.80 + 32;
            $("#temp").text("Temperature (F) " + tempF.toFixed(2));

            console.log("Wind Speed: " + response.wind.speed);
            console.log("Humidity: " + response.main.humidity);
            console.log("Temperature (F): " + tempF);

        });

});
