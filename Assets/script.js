var cities = ["Phoenix", "Flagstaff", "Tucson", "Plano"];

function displayWeatherInfo() {

    var APIKey = 'be2657f4805264720d4f2be16afc80a4';//Tested key. Still working

    var weather = $(this).attr("data-name");
    

    var queryCurrentURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + weather + '&units=imperial&appid=' + APIKey;//url to pull current weather data
    var queryForecastURL = 'https://api.openweathermap.org/data/2.5/forecast?q=' + weather + '&units=imperial&appid=' + APIKey;//url to pull forecast weather data

    //Request and response for current temperature, humidity and wind speed.
    $.ajax({
        url: queryCurrentURL,
        method: "GET"
    }).then(function (response) {

        var weatherDiv = $("<div class='weather'>");

        $("#city").html("<h1>" + response.name + ' (' + moment().format('M/D/YYYY') + ')' + "<img src='http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png'>" + "</h1>");
        $("#wind").append("<p>Wind Speed: " + response.wind.speed + "</p>");
        $("#humidity").append("<p>Humidity: " + response.main.humidity + "</p>");
        $("#temp").append("<p>Temperature: " + response.main.temp + ' F</p>');

        var lon = response.coord.lon;
        var lat = response.coord.lat;

        var queryUVUrl = 'https://api.openweathermap.org/data/2.5/uvi?appid=' + APIKey + '&lat=' + lat + '&lon=' + lon;

        // Request and response for uv index data
        $.ajax({
            url: queryUVUrl,
            method: "GET"
        }).then(function (response) {

            $("#uv").append("<p>UV Index: " + response.value + "</p>");

        });
        
        // Request and response for 5day forecast
        $.ajax({
            url: queryForecastURL,
            method: "GET"
        }).then(function (response) {

            for (var i = 6; i < response.list.length; i += 8) {

                var day = $('#day');
                day.append('<h4>' + response.list[i].dt_txt + '</h4>');
                day.append("<img src='http://openweathermap.org/img/wn/" + response.list[i].weather[0].icon + "@2x.png'>");
                day.append('<p>Temp: ' + response.list[i].main.temp + " F</p>");
                day.append('<p>Humidity: ' + response.list[i].main.humidity + ' %</p>');
            };
        });

        // Putting the entire movie above the previous movies
        $("#allData").prepend(weatherDiv);//adjust to replace the new weather

    });
};


// Function for displaying movie data
function renderButtons(city) {

       var btn = $("<button>");
        // Adding a class of movie-btn to our button
        btn.addClass("weather-btn");
        // Adding a data-attribute
        btn.attr("data-name", city);
        // Providing the initial button text
        btn.text(city);
        // Adding the button to the buttons-view div
        $(".cities-array").append(btn);

};

var searchBtn = $('#searchBtn');
// This function handles events where a movie button is clicked
searchBtn.on("click", function (event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var city = $("#cityInput");

    // Adding movie from the text box to our array
    city.push(weather);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
});

// Adding a click event listener to all elements with a class of "movie-btn"
$(document).on("click", "weather-btn", displayWeatherInfo);













// $(searchBtn).on('click', function () {

//     var cityInput = $("#cityInput").val();

//     var APIKey = 'be2657f4805264720d4f2be16afc80a4';//Tested key. Still working

//     var queryCurrentURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityInput + '&units=imperial&appid=' + APIKey;//url to pull current weather data
//     var queryForecastURL = 'https://api.openweathermap.org/data/2.5/forecast?q=' + cityInput + '&units=imperial&appid=' + APIKey;//url to pull forecast weather data

//     //Request and response for current temperature, humidity and wind speed.
//     $.ajax({
//         url: queryCurrentURL,
//         method: "GET"
//     }).then(function (response) {

//         $("#city").html("<h1>" + response.name + ' (' + moment().format('M/D/YYYY') + ')' + "<img src='http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png'>" + "</h1>");
//         $("#wind").append("<p>Wind Speed: " + response.wind.speed + "</p>");
//         $("#humidity").append("<p>Humidity: " + response.main.humidity + "</p>");
//         $("#temp").append("<p>Temperature: " + response.main.temp + ' F</p>');

//         var lon = response.coord.lon;
//         var lat = response.coord.lat;

//         var queryUVUrl = 'https://api.openweathermap.org/data/2.5/uvi?appid=' + APIKey + '&lat=' + lat + '&lon=' + lon;

//         // Request and response for uv index data
//         $.ajax({
//             url: queryUVUrl,
//             method: "GET"
//         }).then(function (response) {

//             $("#uv").append("<p>UV Index: " + response.value + "</p>");

//         });
//     });

//     // Request and response for 5day forecast
//     $.ajax({
//         url: queryForecastURL,
//         method: "GET"
//     }).then(function (response) {

//         //var dateArray = response.list.dt_txt;

//         // for (let i = ; i < dateArray.length; i++){
//         //     console.log(dateArray.length[i]);         
//         // }

//         for (var i = 6; i < response.list.length; i += 8) {

//             var day = $('#day');
//             day.append('<h4>' + response.list[i].dt_txt + '</h4>');
//             day.append("<img src='http://openweathermap.org/img/wn/" + response.list[i].weather[0].icon + "@2x.png'>");
//             day.append('<p>Temp: ' + response.list[i].main.temp + " F</p>");
//             day.append('<p>Humidity: ' + response.list[i].main.humidity + ' %</p>');
//         };
//     });




// });


 


