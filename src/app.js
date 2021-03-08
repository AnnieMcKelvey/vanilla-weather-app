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

// Function that collects data from API and displays on page
function showWeather(response) {
  console.log(response.data);
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
  console.log(response.data.weather[0].icon);
  document
    .querySelector("#main-icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
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

search("Wellington");
