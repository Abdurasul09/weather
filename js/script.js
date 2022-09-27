const api = {
  key: "92a15606bc7d58b88c98d94c731a3e53",
  baseUrl: "https://api.openweathermap.org/data/2.5/",
};

const searchBox = document.querySelector(".search-box");

searchBox.addEventListener("keypress", setQuery);

function setQuery(event) {
  if (event.keyCode == 13) {
    getResult(searchBox.value);
  }
}

function getResult(query) {
  console.log(query);
  fetch(`${api.baseUrl}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((res) => res.json())
    .then(displayResults);
}

function displayResults(weather) {
  console.log(weather);
  const city = document.querySelector(".city");
  city.innerHTML = `${weather.name} ${weather.sys.country}`;

  const now = new Date();
  const date = document.querySelector(".data");
  date.innerHTML = getDate(now);

  const temp = document.querySelector(".main-temp .temp");
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;

  const weatherEl = document.querySelector(".weather");
	if(weather.weather[0].main === "Rain"){
		weatherEl.innerHTML = `${weather.weather[0].main} <i class="fa-solid fa-cloud-showers-heavy"></i>`;
	} else if(weather.weather[0].main === "Clouds"){
		weatherEl.innerHTML = `${weather.weather[0].main} <i class="fa-solid fa-cloud"></i>`;
	}else if(weather.weather[0].main === "Danger"){
		weatherEl.innerHTML = `${weather.weather[0].main} <i class="fa-solid fa-bolt"></i>`;
	}else if(weather.weather[0].main === "Clear"){
		weatherEl.innerHTML = `${weather.weather[0].main}
		<i class="fa-solid fa-bolt"></i>`;
	}else if(weather.weather[0].main === "Fog"){
		weatherEl.innerHTML = `${weather.weather[0].main} <i class="fa-solid fa-cloud-fog"></i>`;
	} else{
		weatherEl.innerHTML = `${weather.weather[0].main}`;
	}

	console.log(weather.weather[0].main);

  

  const hiLow = document.querySelector(".hi-low");
  hiLow.innerHTML = `
	  ${Math.round(weather.main.temp_min)} °C /
	  ${Math.round(weather.main.temp_max)} °C 
	`;
}

function getDate(a) {
  const months = [
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

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const day = days[a.getDay()];
	console.log(day);
  const date = a.getDate();
  const month = months[a.getMonth()];
  const year = a.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
