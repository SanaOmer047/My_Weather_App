
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
   getforecastdata(response.data.city);
  };
    function searchcity (city){
    let apiKey = "aet38f3bo337f6e891d11f066a098c49";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature);
    };
    function search(event) {
    event.preventDefault();
     let searchElement = document.querySelector("#searchInput");
      searchcity(searchElement.value);
    };
    function getforecastdata(city){
      let apikey = "aet38f3bo337f6e891d11f066a098c49";
      let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apikey}&units=metric`;
      axios(apiUrl).then(veiwforecast);
    };
    function realday(timestamp){
      let date = new Date (timestamp * 1000);
      let days =["Mon","Tue", "Wed", "Thu", "Fri", "Sat","Sun"];
      return days[date.getDay()];
    }
    function veiwforecast(response){
     console.log(response.data);
   
   let forcasteHTML ="";
   let forecast = document.querySelector("#forecast");
   response.data.daily.forEach(function(day,index){
    if (index < 6){
   forcasteHTML +=
    `<div class= "weatherForecast">
    <span class = "weather-forcast-day-one">
    ${realday(day.time)}
    </span>
  <span>
    <img src="${day.condition.icon_url}
      " alt="" width="50px">
  </span> <br/>
  <span class="min-temprature">${Math.round(day.temperature.maximum)}º</span><span class ="max-temprature"> ${Math.round(day.temperature.minimum)}º</span>
</div>`}
    });

forecast.innerHTML=forcasteHTML;
};

   
  let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", search);

searchcity("kabul");