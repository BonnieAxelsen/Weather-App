//Search form

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function displayWeatherInput(response) {
  celciusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
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
  document.querySelector("#time").innerHTML = formatDate(
    response.data.dt * 1000
  );
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

function retrievePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiKey = "d1214a1e2aee0aef5a6803c2d3bbfa53";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let apiUrl = `${apiEndpoint}lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherInput);
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
  dayZero.innerHTML = daysShort[(day + 1) % 7];
  let dayOne = document.querySelector("#dayOne");
  dayOne.innerHTML = daysShort[(day + 2) % 7];
  let dayTwo = document.querySelector("#dayTwo");
  dayTwo.innerHTML = daysShort[(day + 3) % 7];
  let dayThree = document.querySelector("#dayThree");
  dayThree.innerHTML = daysShort[(day + 4) % 7];
}
displayForecastDays();

searchCity("Aarhus");
