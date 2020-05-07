//------------------Variables------------------------

var APIKey = 'be2657f4805264720d4f2be16afc80a4';//Tested key. Still working
var queryCurrentURL = 'https://api.openweathermap.org/data/2.5/weather?q=phoenix&appid=' + APIKey;//url to pull data from

// var cityInput = $("#cityInput").val();

var searchBtn = $('#searchBtn');

//-------------------Calling to the OpenWeatherMap API ------------------



$(searchBtn).on('click', function () {
    $.ajax({//Get request for current temperature
        url: queryCurrentURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)

        $("#city").html("<h1>" + response.name + "</h1>");
        $("#wind").text("Wind Speed: " + response.wind.speed);
        $("#humidity").text("Humidity: " + response.main.humidity);

        var tempF = (response.main.temp - 273.15) * 1.80 + 32;
        $("#temp").text("Temperature: " + tempF.toFixed(2) + ' F');

        console.log("Wind Speed: " + response.wind.speed);
        console.log("Humidity: " + response.main.humidity);
        console.log("Temperature (F): " + tempF);
    });

    //request for uv data
    
    //request for 5day forecast

});





