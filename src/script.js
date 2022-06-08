// intro alert
/*function promptUserForCity() {
  let city = prompt("Enter a city");
  city = city.toLowerCase();
  city = city.trim();
  return city;
}

let weather = {
  paris: {
    temp: 19.7,
    humidity: 80,
  },
  tokyo: {
    temp: 17.3,
    humidity: 50,
  },
  lisbon: {
    temp: 30.2,
    humidity: 20,
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100,
  },
  moscow: {
    temp: -5,
    humidity: 20,
  },
};
*/
function cToF(celciusTemp) {
  return (celciusTemp * 9) / 5 + 32;
}

function fToC(fahrenheitTemp) {
  return (5 / 9) * (fahrenheitTemp - 32);
}
/*
let userInput = promptUserForCity();
if (userInput in weather) {
  alert(
    `It is currently ${Math.round(weather[userInput].temp)}°C (${Math.round(
      cToF(weather[userInput].temp)
    )}°F) in ${userInput} with a humidity of ${weather[userInput].humidity}%`
  );
} else {
  alert(
    `Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${userInput}`
  );
}
*/

//Search form

function displayWeatherInput(response) {
  console.log(response.data);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#country-code").innerHTML = response.data.sys.country;
  document.querySelector("#temp").innerHTML = `${Math.round(
    response.data.main.temp
  )}°`;
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;
}

function searchCity(city) {
  let units = "metric";
  let apiKey = "d1214a1e2aee0aef5a6803c2d3bbfa53";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?q=";
  let apiUrl = `${apiEndpoint}${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayWeatherInput);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  searchCity(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

searchCity("Aarhus");

// Geolocation button (weather-description, city, country code, temp)

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let currentLocationButton = document.querySelector("#location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

function showTempDescription(response) {
  let description = response.data.weather[0].description;
  let headingDescription = document.querySelector("#weather-description");
  headingDescription.innerHTML = description;
}

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let headingTemp = document.querySelector("#temp");
  headingTemp.innerHTML = `${temperature}°`;
}

function showTempCity(response) {
  console.log(response);
  let city = response.data.name;
  let headingCity = document.querySelector("#city");
  headingCity.innerHTML = city;
}

function showTempCountry(response) {
  let country = response.data.sys.country;
  let headingCountry = document.querySelector("#country-code");
  headingCountry.innerHTML = country;
}

function retrievePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiKey = "d1214a1e2aee0aef5a6803c2d3bbfa53";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let apiUrl = `${apiEndpoint}lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  //console.log(apiUrl);
  axios.get(apiUrl).then(showTempDescription);
  axios.get(apiUrl).then(showTemperature);
  axios.get(apiUrl).then(showTempCity);
  axios.get(apiUrl).then(showTempCountry);
}

// Date
function getDate() {
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  if (month < 10) {
    month = `0${month}`;
  }
  let day = date.getDate();
  if (day < 10) {
    day = `0${day}`;
  }
  return `${day}/${month}/${year}`;
}

function displayCurrentDate() {
  let dateDisplay = document.querySelector("#date");
  dateDisplay.innerHTML = getDate();
}

function displayCurrentDay() {
  let date = new Date();
  let day = date.getDay();
  let days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  let dayDisplay = document.querySelector("#day");
  dayDisplay.innerHTML = days[day];
}

displayCurrentDate();
displayCurrentDay();

// Unit of temp
function celciusClicked() {
  let celcius = document.querySelector("#celcius");
  celcius.innerHTML = "<strong>°C </strong>";
  let fahrenheit = document.querySelector("#fahrenheit");
  fahrenheit.innerHTML = "°F";
  let temperature = document.querySelector("#temp");
  temperature.innerHTML = "18°";
}
let celcius = document.querySelector("#celcius");
celcius.addEventListener("click", celciusClicked);

function fahrenheitClicked() {
  let fahrenheit = document.querySelector("#fahrenheit");
  fahrenheit.innerHTML = "<strong>°F</strong>";
  let celcius = document.querySelector("#celcius");
  celcius.innerHTML = "°C ";
  let temperature = document.querySelector("#temp");
  temperature.innerHTML = `${Math.round(cToF(18))}°`;
}
let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", fahrenheitClicked);

// Forecast days
let daysShort = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

function displayForecastDays() {
  let date = new Date();
  let day = date.getDay();
  let dayZero = document.querySelector("#dayZero");
  dayZero.innerHTML = daysShort[day];
  let dayOne = document.querySelector("#dayOne");
  dayOne.innerHTML = daysShort[(day + 1) % 7];
  let dayTwo = document.querySelector("#dayTwo");
  dayTwo.innerHTML = daysShort[(day + 2) % 7];
  let dayThree = document.querySelector("#dayThree");
  dayThree.innerHTML = daysShort[(day + 3) % 7];
}
displayForecastDays();
