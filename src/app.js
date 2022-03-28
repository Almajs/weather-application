let apiKey = "6c9652fb4aafdb6667f90afa73f1d29b";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";

function searchCity(event){
  
  event.preventDefault();
  let city = document.querySelector("#put-city");
  console.log(city.value);
  axios.get(`${apiUrl}&q=${city.value}&appid=${apiKey}`).then(showCity);
    
}
function showCity(response){
  console.log(response.data);
  let currentCity = document.querySelector("#card-city");
  currentCity.innerHTML = response.data.name;
  let currentTemp = document.querySelector("#temp-value");
  currentTemp.innerHTML = Math.round(response.data.main.temp); 
  let humidity = document.querySelector("#humidity-value");
  humidity.innerHTML = (response.data.main.humidity) + " %" ; 
  let wind = document.querySelector("#wind-value");
  wind.innerHTML = Math.round(response.data.wind.speed) + " km/h"; 
}



function showPosition(position){
console.log(position);
axios.get(`${apiUrl}&lon=${position.coords.longitude}&lat=${position.coords.latitude}&appid=${apiKey}`).then(showCity);
}

function getPosition(event){
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  }


}

let geoButton = document.querySelector("#geo-btn");
geoButton.addEventListener("click", getPosition);

let form = document.querySelector("form");
form.addEventListener("submit",searchCity);



let now = new Date();

let date = now.getDate();
let hours = now.getHours();
if( hours < 10 ) {
  hours = "0" + hours;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = "0" + minutes;
}
let years = now.getFullYear();
let month = now.getMonth();

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];

let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
month = months[now.getMonth()];
let cardDay = document.querySelector("#card-dayTime");

cardDay.innerHTML = `${day}, ${month} ${date}, ${hours}:${minutes}`;











