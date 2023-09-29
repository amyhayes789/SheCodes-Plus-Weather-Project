//Display the current Date and Time
function currentDate(date) {
  let dates = date.getDate();
  if (dates === 1 || dates === 21 || dates === 31) {
    dates = `${dates}st`;
  }
  if (dates === 2 || dates === 22) {
    dates = `${dates}nd`;
  }
  if (dates === 3 || dates === 23) {
    dates = `${dates}rd`;
  } else {
    dates = `${dates}th`;
  }

  let year = date.getFullYear();

  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

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

  let months = [
    "January",
    "Febuary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[date.getMonth()];
  return `${day} ${dates} ${month} ${year} - ${hour}:${minutes}`;
}

let dateTime = document.querySelector("#date-time");
let now = new Date();
dateTime.innerHTML = currentDate(now);

//default location
let defaultlocation = "London";

function setdefault(loadlocation) {
  let searchKey = "bd3bb6534458ba51b48c49f5155745b6";
  let searchUrl = `https://api.openweathermap.org/data/2.5/weather?q=${loadlocation}&appid=${searchKey}&units=metric`;
  axios.get(searchUrl).then(displayWeather);
}
setdefault(defaultlocation);

//Location from search bar
let searchBar = document.querySelector("#searchButton");
searchBar.addEventListener("click", search);

function search(event) {
  event.preventDefault();
  let searchLocation = document.querySelector("#search-bar");
  let newlocation = document.querySelector("#location");
  newlocation.innerHTML = `${searchLocation.value}`;

  let searchKey = "bd3bb6534458ba51b48c49f5155745b6";
  let searchUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchLocation.value}&appid=${searchKey}&units=metric`;
  axios.get(searchUrl).then(displayWeather);
}

//Change location to current location
let currentButton = document.querySelector("#currentLocation");
currentButton.addEventListener("click", getCurrentPosition);

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  console.log(`Lat is ${lat} and Lon is ${lon}`);

  let key = "bd3bb6534458ba51b48c49f5155745b6";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`;
  axios.get(url).then(displayWeather);
}

//Update weather based on locations
function displayWeather(response) {
  let weather = response.data;
  console.log(weather);

  celciusTemperature = response.data.main.temp;
  let temperature = Math.round(celciusTemperature);
  console.log(temperature);
  let cityTemp = document.querySelector("#today-c");
  cityTemp.innerHTML = `${temperature}°C`;

  celciusMinTemperature = response.data.main.temp_min;
  let minTemperature = Math.round(celciusMinTemperature);
  console.log(minTemperature);
  let currentCityMinTemp = document.querySelector("#today-l");
  currentCityMinTemp.innerHTML = `Min ${minTemperature}°C`;

  celciusMaxTemperature = response.data.main.temp_max;
  let maxTemperature = Math.round(celciusMaxTemperature);
  console.log(maxTemperature);
  let currentCityMaxTemp = document.querySelector("#today-h");
  currentCityMaxTemp.innerHTML = `Max ${maxTemperature}°C`;

  let mainIcon = response.data.weather[0].icon;
  console.log(mainIcon);
  let weatherIcon = document.querySelector("#mainWeatherIcon");
  weatherIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${mainIcon}@2x.png`
  );

  let location = response.data.name;
  console.log(location);
  let templocation = document.querySelector("#location");
  templocation.innerHTML = location;

  let description = response.data.weather[0].description;
  console.log(description);
  let currentCityDescription = document.querySelector("#description");
  currentCityDescription.innerHTML = description;

  let humidity = response.data.main.humidity;
  console.log(humidity);
  let currentCityHumidity = document.querySelector("#humidity");
  currentCityHumidity.innerHTML = `Humidity ${humidity}%`;

  let pressure = response.data.main.pressure;
  console.log(pressure);
  let currentCityPressure = document.querySelector("#pressure");
  currentCityPressure.innerHTML = `Pressure ${pressure}mb`;

  let windSpeed = response.data.wind.speed;
  console.log(windSpeed);
  let currentCityWindSpeed = document.querySelector("#windSpeed");
  currentCityWindSpeed.innerHTML = `Wind Speed ${windSpeed}m/s`;

  let feelsLike = Math.round(response.data.main.feels_like);
  console.log(feelsLike);
  let currentCityFeelsLike = document.querySelector("#feelslike");
  currentCityFeelsLike.innerHTML = `Temperature feels like ${feelsLike}°C`;

  getForecast(response.data.coord);
}
//Forecast Function
function getForecast(coordinates) {
  console.log(coordinates);

  let forecastKey = "bd3bb6534458ba51b48c49f5155745b6";
  let forecastURl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${forecastKey}&units=metric`;

  axios.get(forecastURl).then(displayForecast);
}

// Create Days for Forecast Labels
function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

//Create Forecast
function displayForecast(response) {
  console.log(response.data.daily);
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col">
          <div class="card day">
            <div class="row">
              <h5 class="card-title weekday">${formatForecastDay(
                forecastDay.dt
              )}</h5>
            </div>
            <div class="row">
              <img
                src="https://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png"
                alt="Forecast Day Icon"
                class="dayIcon"
              />
            </div>
            <div class="row">
              <div class="col">
                <p class="card-text temp-h">${Math.round(
                  forecastDay.temp.max
                )}°C</p>
              </div>
              <div class="col">
                <p class="card-text temp-l">${Math.round(
                  forecastDay.temp.min
                )}°C</p>
              </div>
            </div>
          </div>
        </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//Change between Centigrade and Fahrenheit
let centigrade = document.querySelector("#c-link");
centigrade.addEventListener("click", cTemp);

let fahrenheit = document.querySelector("#F-link");
fahrenheit.addEventListener("click", fTemp);

let celciusTemperature = null;
let celciusMinTemperature = null;
let celciusMaxTemperature = null;

function cTemp(event) {
  event.preventDefault();
  centigrade.classList.add("active");
  centigrade.classList.remove("inactive");
  fahrenheit.classList.remove("active");
  fahrenheit.classList.add("inactive");

  let celciusMainTemperature = Math.round(celciusTemperature);
  let cityTemp = document.querySelector("#today-c");
  cityTemp.innerHTML = `${celciusMainTemperature}°C`;

  let minCelciusTemperature = Math.round(celciusMinTemperature);
  let currentCityMinTemp = document.querySelector("#today-l");
  currentCityMinTemp.innerHTML = `Min ${minCelciusTemperature}°C`;

  let maxCelciusTemperature = Math.round(celciusMaxTemperature);
  let currentCityMaxTemp = document.querySelector("#today-h");
  currentCityMaxTemp.innerHTML = `Max ${maxCelciusTemperature}°C`;
}

function fTemp(event) {
  event.preventDefault();
  centigrade.classList.remove("active");
  centigrade.classList.add("inactive");
  fahrenheit.classList.add("active");
  fahrenheit.classList.remove("inactive");

  let fahrenheitTemperature = Math.round(celciusTemperature * (9 / 5) + 32);
  let cityTemp = document.querySelector("#today-c");
  cityTemp.innerHTML = `${fahrenheitTemperature}°F`;

  let minFarenheitTemperature = Math.round(
    celciusMinTemperature * (9 / 5) + 32
  );
  let currentCityMinTemp = document.querySelector("#today-l");
  currentCityMinTemp.innerHTML = `Min ${minFarenheitTemperature}°F`;

  let maxFarenheitTemperature = Math.round(
    celciusMaxTemperature * (9 / 5) + 32
  );
  let currentCityMaxTemp = document.querySelector("#today-h");
  currentCityMaxTemp.innerHTML = `Max ${maxFarenheitTemperature}°F`;
}
