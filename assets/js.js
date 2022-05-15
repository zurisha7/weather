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
    weatherContainerEl.textContent = "";
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
        
      };

 

userFormEl.addEventListener("submit", formSubmitHandler);
 

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
        console.log(data)
          
      });
    }
  }); 
};
//create the daily weather
var currentWeather = function(x) {
  //loop to get info
  var array = {};
  for (var i = 0; i < x.length; i++);
  {
    console.log(x);
  }
  var temperature = x.temp;
  document.getElementById("w1").innerText = temperature;
  var windSpeed = x.wind_speed;
  console.log (windSpeed);
  var UV = x.uvi;
  console.log(UV);
  var humid = x.humidity;
  console.log(humid);

  //var dailyText = JSON.stringify(x);
  //       var dailyList = document.createElement("li");
//       dailyList.innerText = dailyText;
//       console.log(dailyText);
//      weatherContainerEl.appendChild(dailyList);

};