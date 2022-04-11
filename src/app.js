let apiKey = `6c9652fb4aafdb6667f90afa73f1d29b`;
let city = "";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?&units=metric`;

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#put-city");
  console.log(city.value);
  axios.get(`${apiUrl}&q=${city.value}&appid=${apiKey}`).then(showCity);
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = `6c9652fb4aafdb6667f90afa73f1d29b`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showCity(response) {
  console.log(response.data);
  let currentCity = document.querySelector("#card-city");
  let currentTemp = document.querySelector("#temp-value");
  let humidity = document.querySelector("#humidity-value");
  let wind = document.querySelector("#wind-value");
  let iconElement = document.querySelector("#icon-value");
  let descriptionElement = document.querySelector("#description-value");
  celsiusTemperature = response.data.main.temp;

  currentCity.innerHTML = response.data.name;
  currentTemp.innerHTML = Math.round(response.data.main.temp);
  humidity.innerHTML = response.data.main.humidity + " %";
  wind.innerHTML = Math.round(response.data.wind.speed) + " km/H";
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  descriptionElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function showPosition(position) {
  console.log(position);
  axios
    .get(
      `${apiUrl}&lon=${position.coords.longitude}&lat=${position.coords.latitude}&appid=${apiKey}`
    )
    .then(showCity);
}

let form = document.querySelector("form");
form.addEventListener("submit", searchCity);

let now = new Date();

let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = "0" + hours;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = "0" + minutes;
}
let month = now.getMonth();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
month = months[now.getMonth()];
let cardDay = document.querySelector("#card-dayTime");

cardDay.innerHTML = `${day} ${hours}:${minutes}`;

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temp-value");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp-value");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
          <div class="col">
            <div class="weather-forecast-date">${formatDay(
              forecastDay.dt
            )}</div>
            <img
              src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png"
              alt=""
              width="42"
            />
            <div class="weather-forecast-temperatures">
              <span class="weather-forecast-temperature-max">${Math.round(
                forecastDay.temp.max
              )}° </span>
              <span class="weather-forecast-temperature-min">${Math.round(
                forecastDay.temp.min
              )}° </span>
            </div>
          </div>
      `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
