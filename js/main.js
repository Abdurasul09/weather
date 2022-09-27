const api = {
  key: "92a15606bc7d58b88c98d94c731a3e53",
  baseUrl: "https://api.openweathermap.org/data/2.5/",
};

const searchBox = document.querySelector(".search-box");
const icon = document.querySelector(".icon");
searchBox.addEventListener("keypress", setQuery);
function setQuery(e) {
  if (e.keyCode == 13) {
    getRes(searchBox.value);
  }
}

function getRes(query) {
  fetch(`${api.baseUrl}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResults);
}

function displayResults(weather) {
  console.log(weather);
  if (weather.clouds.all === 19) {
    icon.innerHTML += `
      <i class="fa-regular fa-cloud"></i>
    `
  }

  let city = document.querySelector(".location .city");
  city.innerHTML = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector(".location .data");
  date.innerHTML = dateBuilder(now);

  const temp = document.querySelector(".temp");
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;

  const weatherEl = document.querySelector(".weather");
  weatherEl.innerHTML = weather.weather[0].main;
  const hiLow = document.querySelector(".hi-low");
  hiLow.innerHTML = `
    ${Math.round(weather.main.temp_min)}°C / 
    ${Math.round(weather.main.temp_max)}°C
  `;
}

function dateBuilder(newDate) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "july",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[newDate.getDay()];
  let date = newDate.getDay();
  let month = months[newDate.getMonth()];
  let year = newDate.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
