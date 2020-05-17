var cities = [""];

function displayWeatherInfo(city) {
    var APIKey = 'be2657f4805264720d4f2be16afc80a4';//Tested key. Still working

    var queryCurrentURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=' + APIKey;//url to pull current weather data
    var queryForecastURL = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&units=imperial&appid=' + APIKey;//url to pull forecast weather data

    //Request and response for current temperature, humidity and wind speed.
    $.ajax({
        url: queryCurrentURL,
        method: "GET"
    }).then(function (response) {
        var dataDiv = $("#data");
        dataDiv.html("<h1>" + response.name + ' (' + moment().format('M/D/YYYY') + ')' + "<img src='http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png'>" + "</h1>");
        dataDiv.append("<p>Wind Speed: " + response.wind.speed + "</p>");
        dataDiv.append("<p>Humidity: " + response.main.humidity + "</p>");
        dataDiv.append("<p>Temperature: " + response.main.temp + ' F</p>');

        var lon = response.coord.lon;
        var lat = response.coord.lat;
        var queryUVUrl = 'https://api.openweathermap.org/data/2.5/uvi?appid=' + APIKey + '&lat=' + lat + '&lon=' + lon;

        // Request and response for uv index data
        $.ajax({
            url: queryUVUrl,
            method: "GET"
        }).then(function (response) {
            dataDiv.append("<p>UV Index: " + response.value + "</p>");
        });
        
        // Request and response for 5day forecast
        $.ajax({
            url: queryForecastURL,
            method: "GET"
        }).then(function (response) {
            for (var i = 6; i < response.list.length; i += 8) {

                var day = $("#day");
                day.append('<h4>' + response.list[i].dt_txt + '</h4>');
                day.append("<img src='http://openweathermap.org/img/wn/" + response.list[i].weather[0].icon + "@2x.png'>");
                day.append('<p>Temp: ' + response.list[i].main.temp + " F</p>");
                day.append('<p>Humidity: ' + response.list[i].main.humidity + ' %</p>');


            };
        });


    });


};


//Function for the render button
function renderButtons(city) {
    //$(".citiesDump").empty();

    var btn = $("<button>");//Dynamically adding the button

    btn.addClass("city-btn");//Adding a class to the button

    btn.attr("data-name", city);//Adding a data-attribute

    btn.text(city);//Adding text to the button

    $(".citiesDump").append(btn);//Inserts the button to the page

};


//When the search button is pressed this functions will be executed 
var searchBtn = $('#searchBtn');

searchBtn.on("click", function (event) {//the on click function
    event.preventDefault();//So the form does not refresh the page

    var city = $("#cityInput").val();//Get the input value from the user

    cities.push(city);//Push the value, aka city, into the array.

    renderButtons(city);//Execute the render button function with the value passed in

    displayWeatherInfo(city);//Execute the display info function with the value passed in
});

//Function to attach the data to the added city button
$(document).on("click", ".city-btn", function () {
    var city = $(this).attr("data-name");
    displayWeatherInfo(city);
});