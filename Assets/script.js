
//-------------------Calling to the OpenWeatherMap API ------------------

var searchBtn = $('#searchBtn');
var lon = "";

$(searchBtn).on('click', function () {
    var cityInput = $("#cityInput").val();

    var APIKey = 'be2657f4805264720d4f2be16afc80a4';//Tested key. Still working
    var queryCurrentURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityInput + '&appid=' + APIKey;//url to pull current weather data



    //var queryForecastURL = '';

    // Request and response for current temperature, humidity and wind speed.
    $.ajax({
        url: queryCurrentURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)
        $("#city").html("<h1>" + response.name + ' (' + moment().format('M/D/YYYY') + ')' + "<img src='http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png'>" + "</h1>");
        $("#wind").text("Wind Speed: " + response.wind.speed);
        $("#humidity").text("Humidity: " + response.main.humidity);

        var tempF = (response.main.temp - 273.15) * 1.80 + 32;
        $("#temp").text("Temperature: " + tempF.toFixed(2) + ' F');       

        var lon = response.coord.lon;
        var lat = response.coord.lat;
        console.log(lon);
        console.log(lat);
        var queryUVUrl = 'http://api.openweathermap.org/data/2.5/uvi?appid=' + APIKey  + '&lat=' + lat  + '&lon=' + lon;
        
        // Request and response for uv data
        $.ajax({
            url: queryUVUrl,
            method: "GET"
        }).then(function (response) {
            console.log(response.value);
            $("#uv").text("UV Index: " + response.value);
        });
    });





    // Request and response for 5day forecast

});




