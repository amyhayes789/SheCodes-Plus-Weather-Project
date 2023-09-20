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
  return `${day} ${dates} ${month} ${year}, ${hour}:${minutes}`;
}

let dateTime = document.querySelector("#date-time");
let now = new Date();
dateTime.innerHTML = currentDate(now);

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

  let temperature = Math.round(response.data.main.temp);
  console.log(temperature);
  let cityTemp = document.querySelector("#today-c");
  cityTemp.innerHTML = `${temperature}°C`;

  let minTemperature = Math.round(response.data.main.temp_min);
  console.log(minTemperature);
  let currentCityMinTemp = document.querySelector("#today-l");
  currentCityMinTemp.innerHTML = `Min ${minTemperature}°C`;

  let maxTemperature = Math.round(response.data.main.temp_max);
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

  let feelsLike = response.data.main.feels_like;
  console.log(feelsLike);
  let currentCityFeelsLike = document.querySelector("#feelslike");
  currentCityFeelsLike.innerHTML = `Temperature feels like ${feelsLike}°C`;
}

//Change between Centigrade and Fahrenheit
//let todayMax = 17;
//let todayMin = 10;
//let todayMaxTemp = document.querySelector("#today-h");
//let todayMinTemp = document.querySelector("#today-l");

//function cTemp(event) {
//event.preventDefault();
// todayMaxTemp.innerHTML = `${todayMax}°C`;
//todayMinTemp.innerHTML = `${todayMin}°C`;
//}

//let centigrade = document.querySelector("#c-link");
//centigrade.addEventListener("click", cTemp);

//function fTemp(event) {
// event.preventDefault();
// let todayMaxF = (todayMax * 9) / 5 + 32;
//todayMaxTemp.innerHTML = `${todayMaxF}°F`;
//let todayMinF = (todayMin * 9) / 5 + 32;
//todayMinTemp.innerHTML = `${todayMinF}°F`;
//}

//let fahrenheit = document.querySelector("#F-link");
//fahrenheit.addEventListener("click", fTemp);
