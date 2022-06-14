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
  document
    .querySelector("#weather-image")
    .setAttribute("src", `images/${response.data.weather[0].icon}.svg`);
  celciusTemperature = response.data.main.temp;
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
function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");
  celciusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = `${Math.round(fahrenheitTemperature)}°`;
}

function displayCelciusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");
  celciusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureElement.innerHTML = `${Math.round(celciusTemperature)}°`;
}

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celciusLink = document.querySelector("#celcius");
celciusLink.addEventListener("click", displayCelciusTemperature);

let celciusTemperature = null;

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

searchCity("Aarhus");
