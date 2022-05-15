var cityInputEl = document.querySelector("#textbox");
var userFormEl = document.querySelector("#userForm");
var weatherContainerEl = document.querySelector("#weather");
var forecastContainerEl = document.querySelector("#forecast");
var historyContainerEl = document.querySelector("#history");
var currentList = document.querySelector("#currentW");
var current = "";
var array= [];

var formSubmitHandler = function (event) {
  //prevent refreshing
  event.preventDefault();
  var city = cityInputEl.value.trim();
  if (city) {
    getGeoCode(city);
    //clear other content
    cityInputEl.value = "";
  } else {
    alert("Please enter a city");
  }
  
   if(!city) {
     formSubmitHandler();
   }
   else{
 // create element and append
      var listInfo = document.createElement("li");
      listInfo.classList.add('bg-cornflowerblue');
      listInfo.textContent = city;
      var cityList = document.getElementById("list");
       cityList.appendChild(listInfo);
      }
        cityTime(city);
      };

 

userFormEl.addEventListener("submit", formSubmitHandler);

function cityTime (city){
    var date = new Date();
  document.getElementById('placeTime').textContent = city + "," + " " + date;


}
 

//get lat and lon results for weather API call through GeoCode
function getGeoCode(city) {
  var city = cityInputEl.value;
  // remove spaces from input
  var cityNoSpace = city.replace(/\s+/g, "");

  fetch(
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
      cityNoSpace +
      ",001&limit=5&appid=7a868f7f3e1c34350e2a6bd06e47eb63&units=imperial"
  ).then(function (response) {
    // request was successful
    if (response.ok) {
      response.json().then(function (data) {
        var lat = JSON.parse(data[0].lat);
        var lon = JSON.parse(data[0].lon);
        getWeatherMap(lat, lon);
      });
    } else {
      alert("Error: " + response.statusText);
    }
  });
}

var getWeatherMap = function (lat, lon) {
  fetch(
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
      lat +
      "&lon=" +
      lon +
      "&appid=8da149333bb92aba5022c5a01def0b67&units=imperial"
  )
  .then(function (response) {
    if (response.ok) {
      response.json()
      .then(function (data) {
        currentWeather (data.current);
        forecast(data.daily)
        console.log(data.current);
        
      });
    }
  }); 
};
//create the daily weather
var currentWeather = function(x) {
  document.getElementById('wicon').src="http://openweathermap.org/img/w/"+x.weather[0].icon+".png"
    var temperature = x.temp;
  document.getElementById('w1').textContent = "Temp: " + temperature;

  var windSpeed = x.wind_speed;
  document.getElementById('w2').textContent = 'WindSpeed: ' + windSpeed;

  var UV = x.uvi;
  document.getElementById('w3').textContent = 'UV: ' + UV
  var humid = x.humidity;
  document.getElementById('w4').textContent = 'Humidity: ' + humid;
 
};

function forecast (y) {

// add date of forecast
  var day1 = new Date ();
  console.log(day1);
// add temps from data
  var day1Temp = y[0].temp.day;
  document.getElementById('temp1').innerText = 'Temp: ' + day1Temp;

  var day2Temp = y[1].temp.day;
  document.getElementById('temp2').innerText = 'Temp: ' + day2Temp;

  var day3Temp = y[2].temp.day;
  document.getElementById('temp3').innerText = 'Temp: ' + day3Temp;

  var day4Temp = y[3].temp.day;
  document.getElementById('temp4').innerText = 'Temp: ' + day4Temp;

  var day5Temp = y[4].temp.day;
  document.getElementById('temp5').innerText = 'Temp: ' + day5Temp;

//add humidity
  var day1Humid = y[0].humidity;
  document.getElementById('humid1').innerText = 'Humidity: ' + day1Humid;

  var day2Humid = y[1].humidity;
  document.getElementById('humid2').innerText = 'Humidity: ' + day2Humid;

  var day3Humid = y[2].humidity;
  document.getElementById('humid3').innerText = 'Humidity: ' + day3Humid;

  var day4Humid = y[3].humidity;
  document.getElementById('humid4').innerText = 'Humidity: ' + day4Humid;

  var day5Humid = y[4].humidity;
    document.getElementById('humid5').innerText = 'Humidity: ' + day5Humid;

  //add windspeed to forecast
  var day1Wind = y[0].wind_speed;
  document.getElementById('wind1').innerText = "Wind: " + day1Wind;

  var day2Wind = y[1].wind_speed;
  document.getElementById('wind2').innerText = "Wind: " + day2Wind;

  var day3Wind = y[2].wind_speed;
  document.getElementById('wind3').innerText = "Wind: " + day3Wind;

  var day4Wind = y[3].wind_speed;
  document.getElementById('wind4').innerText = "Wind: " + day4Wind;

  var day5Wind = y[4].wind_speed;
  document.getElementById('wind5').innerText = "Wind: " + day5Wind;

  // add icons to forecast
  document.getElementById('icon1').src="http://openweathermap.org/img/w/"+y[0].weather[0].icon+".png"

  document.getElementById('icon2').src="http://openweathermap.org/img/w/"+y[1].weather[0].icon+".png"

  document.getElementById('icon3').src="http://openweathermap.org/img/w/"+y[2].weather[0].icon+".png"
  
  document.getElementById('icon4').src="http://openweathermap.org/img/w/"+y[3].weather[0].icon+".png"

  document.getElementById('icon5').src="http://openweathermap.org/img/w/"+y[4].weather[0].icon+".png"
}
