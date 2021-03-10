// Getting the day and time with function

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = date.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }

  return `${day}, ${hour}:${minute}`;
}

let timeDate = document.querySelector("#day-date");
let now = new Date();

timeDate.innerHTML = formatDate(now);

// Week 5 Retreiving Real Data

let weatherIcons = {
  "01d": `images/sun.png`,
  "01n": `images/clear-sky-night.png`,
  "02d": `images/sun-with-cloud.png`,
  "02n": `images/cloudy-night.png`,
  "03d": `images/cloud.png`,
  "03n": `images/cloudy-night.png`,
  "04d": `images/cloud.png`,
  "04n": `images/cloudy-night.png`,
  "09d": "images/raining.png",
  "09n": "images/raining-night.png",
  "10d": `images/raincloud-sun.png`,
  "10n": `images/cloudy-night.png`,
  "11d": `images/clouds-wind.png`,
  "11n": `images/cloudy-night.png`,
  "13d": `images/snowing.png`,
  "13n": `images/snowing.png`,
  "50d": "images/fog.png",
  "50n": "images/fog.png",
};

// Function that collects data from API and displays on page
function showWeather(response) {
  console.log(response.data);

  //Added my personalised icons

  // Temperature
  document.querySelector("#main-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  //Humidity
  document.querySelector("#humidity-info").innerHTML = Math.round(
    response.data.main.humidity
  );
  //Windspeed
  document.querySelector("#wind-speed-info").innerHTML = Math.round(
    response.data.wind.speed
  );
  //Description
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;
  //City
  document.querySelector("#display-city").innerHTML = response.data.name;
  // Real feel
  document.querySelector("#feels-like-info").innerHTML =
    response.data.main.feels_like;
  //Main Icon
  // Main Icon
  console.log(response.data.weather[0].description);
  document
    .querySelector("#main-icon")
    .setAttribute("src", weatherIcons[response.data.weather[0].icon]);
  // Main Icon Alt text
  document
    .querySelector("#main-icon")
    .setAttribute("alt", response.data.weather[0].description);

  celsuiusTemperature = response.data.main.temp;
}

// Function to get exact GPS coordinates

function retrievePosition(position) {
  debugger;
  console.log(position);
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let unit = "metric";
  let apiKey = "ccd1b45bf93149af01a15dc10d440a17";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

// Adding current location button JS
let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentPosition);

//Getting city search data update

function search(city) {
  let apiKey = "ccd1b45bf93149af01a15dc10d440a17";
  let units = "metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}`;
  axios.get(`${url}&appid=${apiKey}`).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}

let cityForm = document.querySelector("#city-search-form");
cityForm.addEventListener("submit", handleSubmit);

// Celsuis / Fahrenheit conversion

function displayCelsius(event) {
  event.preventDefault();
  let tempretureElement = document.querySelector("#main-temp");
  fahrenheit.classList.remove("active");
  celsuius.classList.add("active");
  tempretureElement.innerHTML = Math.round(celsuiusTemperature);
}

function displayFahrenheit(event) {
  event.preventDefault();
  let tempretureElement = document.querySelector("#main-temp");
  celsuius.classList.remove("active");
  fahrenheit.classList.add("active");
  tempretureElement.innerHTML = Math.round((celsuiusTemperature * 9) / 5 + 32);
}

let celsuius = document.querySelector("#celsuis-link");
celsuius.addEventListener("click", displayCelsius);

let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", displayFahrenheit);

let celsuiusTemperature = null;

search("Truro");
