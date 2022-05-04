//1

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    " Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let currentDate = date.getDate();

  return `${day}, ${hours}:${minutes}`;
}
let now = new Date();
let currentDateInput = document.querySelector("#date");
currentDateInput.innerHTML = formatDate(now);

//API WEATHER
function searchCity(city) {
  let apiKey = "26e66a03b4e6e329dd4ce6ee198b06d7";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

//Current Location

function showTemperature(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}

function searchCurrentCity(city) {
  let latitude = city.coords.latitude;
  let longitude = city.coords.longitude;
  let units = "metric";
  let apiKey = "26e66a03b4e6e329dd4ce6ee198b06d7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCurrentCity);
}

let currentButton = document.querySelector("#currentbutton");
currentButton.addEventListener("click", currentLocation);

searchCity("Sao Paulo");
