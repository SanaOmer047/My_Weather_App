
function currentDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let day = date.getDay();
  
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
  
    if (hours < 10) {
      hours = `0${hours}`;
    }
  
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
  
    let Cdate = days[day];
    return `${Cdate} ${hours}:${minutes}`;
  }
  let nowsDate = new Date();
 let currentDateELement = document.querySelector("#current-time");
 currentDateELement.innerHTML = currentDate(nowsDate);

 function displayTemperature(response) {
    let temperatureElement = document.querySelector("#current_temperature"); 
    let temperature = Math.round(response.data.temperature.current);
    let cityElement = document.querySelector("#current-city"); 
    let temperaturedetails = document.querySelector("#details");
    let feels = Math.round(response.data.temperature.feels_like) ;
    let humidity =Math.round(response.data.temperature.humidity);
    let describe = response.data.condition.description;
    let windSpeed = Math.round(response.data.wind.speed);
    let icons = document.querySelector("#icon");
    let iconurlsrc = response.data.condition.icon_url;
   let iconsrc =`<img src="${iconurlsrc}"/>`
   icons.innerHTML=`${iconsrc}`;
   cityElement.innerHTML = response.data.city;
    temperatureElement.innerHTML =` ${temperature} °C`; 
   temperaturedetails.innerHTML= `${describe}  <br/> Humidity: ${humidity}%,<br/> Feels like: ${feels}°C
   <br/> Wind speed:${windSpeed}Km/h `
  };
  
  function search(event) {
    event.preventDefault();
    let searchInputElement = document.querySelector("#searchInput");
    let city = searchInputElement.value;
  
    let apiKey = "aet38f3bo337f6e891d11f066a098c49";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  
    axios.get(apiUrl).then(displayTemperature)
    };
  
  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", search);
  