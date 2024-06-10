//HTML elements parsing to variables
const tempt = document.querySelector('.temperature');
const temptCity = document.querySelector('.tempt-city');
const conditionCity = document.querySelector('.city-weather');
const cityWeatherImg = document.querySelector('.city-weather-img');
const humidity = document.querySelector('.humidityText');
const windSpeed = document.querySelector('.windText');
const precipitation = document.querySelector('.precipitationText');
const visibility = document.querySelector('.visibilityText');
const weatherCard = document.querySelector('.weather-card');
const searchForm = document.querySelector('.search-form');
const searchCity = document.getElementById('city-search');
const searchBtn = document.getElementById('search-btn');

//Forecast Info 
const todayForecast = document.querySelector('.forecast-text-1');
const tommorrowForecast = document.querySelector('.forecast-text-2');
const dayForecast3 = document.querySelector('.forecast-text-3');
const dayForecast4 = document.querySelector('.forecast-text-4');
const dayForecast5 = document.querySelector('.forecast-text-5');

const todayForecastText = document.querySelector('.forecast-1-p');
const tommorrowForecastText = document.querySelector('.forecast-2-p');
const day3ForecastText = document.querySelector('.forecast-3-p');
const day4ForecastText = document.querySelector('.forecast-4-p');
const day5ForecastText = document.querySelector('.forecast-5-p');

//Forecast Images/Icons
const todayForecastImg = document.querySelector('.forecast-1-img');
const tommorrowForecastImg = document.querySelector('.forecast-2-img');
const day3ForecastImg = document.querySelector('.forecast-3-img');
const day4ForecastImg = document.querySelector('.forecast-4-img');
const day5ForecastImg = document.querySelector('.forecast-5-img');

//API variables
let currentCondition;
let forecast1APi;
let forecast2APi;
let forecast3APi;
let forecast4APi;
let localTime;


// Event Listeners
window.addEventListener('DOMContentLoaded', fetchWeatherData);
searchForm.addEventListener('submit', searchWeatherData);

//API Authentication
let weatherData;
const apiKey = '94105ad6ee7b49f382e150412240706';
const defaultCity = 'New York';


async function fetchWeatherData() {
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${defaultCity}&days=5`)
    const weatherData = await response.json();
    updateUI(weatherData);
    console.log(weatherData);
}
function setBackgroundImage(weatherData) {
     //API variables initialization
     currentCondition = weatherData.current.condition;
     localTime = weatherData.location.localtime;
     //Time to hours
     const dateObject = new Date(localTime);
     const hour = dateObject.getHours();
     
     //Checks for the day/night
     
     //Morning
     if (hour >= 5 && hour < 15){
         if(currentCondition.text.toLowerCase().includes('cloudy') || currentCondition.text.toLowerCase().includes('cloud') || currentCondition.text.toLowerCase().includes('thundery') || currentCondition.text.toLowerCase().includes('overcast')){
         weatherCard.style.background = "url(./img/overcast.jpg)";
     }
     else if(currentCondition.text.toLowerCase().includes('clear') || currentCondition.text.toLowerCase().includes('sunny')){
     weatherCard.style.background = "url(./img/sunny.jpg)";
     }
     else if (currentCondition.text.toLowerCase().includes('rain') || currentCondition.text.toLowerCase().includes('showers')) {
         weatherCard.style.background = "url(./img/rainy.jpg)";
     }
     else if (currentCondition.text.toLowerCase().includes('haze') || currentCondition.text.toLowerCase().includes('fog')) {
         weatherCard.style.background = "url(./img/foghaze.jpg)";
     }
     else if (currentCondition.text.toLowerCase().includes('mist')) {
         weatherCard.style.background = "url(./img/sunny.jpg)";
     }
 }
     // Afternoon & Evening
 if (hour >= 15 && hour < 20) {
     if (currentCondition.text.toLowerCase().includes('cloudy') || currentCondition.text.toLowerCase().includes('cloud') || currentCondition.text.toLowerCase().includes('thundery') || currentCondition.text.toLowerCase().includes('thundery') || currentCondition.text.toLowerCase().includes('overcast')) {
         weatherCard.style.background = "url(./img/overcast.jpg)";
     } else if (currentCondition.text.toLowerCase().includes('clear') || currentCondition.text.toLowerCase().includes('sunny')) {
         weatherCard.style.background = "url(./img/evening.jpeg)";
     } else if (currentCondition.text.toLowerCase().includes('rain') || currentCondition.text.toLowerCase().includes('showers')) {
         weatherCard.style.background = "url(./img/rainy.jpg)";
     } else if (currentCondition.text.toLowerCase().includes('haze') || currentCondition.text.toLowerCase().includes('fog')) {
         weatherCard.style.background = "url(./img/foghaze.jpg)";
     } else if (currentCondition.text.toLowerCase().includes('mist')) {
         weatherCard.style.background = "url(./img/evening.jpeg)";
     }
 }
 
     //Night
     if (hour >= 20 ||  hour < 5){
         if(currentCondition.text.toLowerCase().includes('cloudy') || currentCondition.text.toLowerCase().includes('cloud') || currentCondition.text.toLowerCase().includes('overcast')){
         weatherCard.style.background = "url(./img/overcast.jpg)";
     }
     else if (currentCondition.text.toLowerCase().includes('rain') || currentCondition.text.toLowerCase().includes('showers') || currentCondition.text.toLowerCase().includes('light')) {
         weatherCard.style.background = "url(./img/rainy.jpg)";
     }
     else if (currentCondition.text.toLowerCase().includes('haze') || currentCondition.text.toLowerCase().includes('fog')) {
         weatherCard.style.background = "url(./img/foghaze.jpg)";
     }
     else if(currentCondition.text.toLowerCase().includes('clear') || currentCondition.text.toLowerCase().includes('mist')){
         weatherCard.style.background = "url(./img/night.jpg)";
     }
 }
     weatherCard.style.backgroundRepeat = "no-repeat";
     weatherCard.style.backgroundSize = "cover";
     weatherCard.style.backgroundPosition = "center center"; 
}
async function searchWeatherData(event) {      
    event.preventDefault();
    const city = searchCity.value;
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=5`)
    const weatherData = await response.json();
    console.log(weatherData);
    updateUI(weatherData);

    setBackgroundImage(weatherData);
    searchCity.value = '';
}

function updateUI(weatherData) {
    if (weatherData) {
        //API variables initialization
        currentCondition = weatherData.current.condition;
        forecast1APi = weatherData.forecast.forecastday[1];
        forecast2APi = weatherData.forecast.forecastday[2];
        forecast3APi = weatherData.forecast.forecastday[3];
        forecast4APi = weatherData.forecast.forecastday[4];

        //Set Background Image
        setBackgroundImage(weatherData);

        localTime = weatherData.location.localtime;
        //Time to hours
        const dateObject = new Date(localTime);
        const hour = dateObject.getHours();
        console.log(hour);
        //UI Main Showcase Elements
            tempt.textContent = `${weatherData.current.temp_c} °C`;
            temptCity.textContent = weatherData.location.name;
            cityWeatherImg.src = `https:${currentCondition.icon}`;
            conditionCity.textContent = currentCondition.text;
                
        //Weekly Forecast Tags    
            // Today
            todayForecastImg.src = `https:${currentCondition.icon}`;
            todayForecastText.textContent = currentCondition.text;
            todayForecast.textContent =  `${weatherData.current.temp_c} °C`;
            //Tommrrow
            tommorrowForecastImg.src =`https:${forecast1APi.day.condition.icon}`;
            tommorrowForecastText.textContent = forecast1APi.day.condition.text;
            tommorrowForecast.textContent = `${forecast1APi.day.avgtemp_c} °C`;
            //Day 3
            day3ForecastImg.src = `https:${forecast2APi.day.condition.icon}`;
            day3ForecastText.textContent = forecast2APi.day.condition.text;
            dayForecast3.textContent = `${forecast2APi.day.avgtemp_c} °C`;
            //Day 4
            day4ForecastImg.src = `https:${forecast3APi.day.condition.icon}`;
            day4ForecastText.textContent = forecast3APi.day.condition.text;
            dayForecast4.textContent = `${forecast3APi.day.avgtemp_c} °C`;
            //Day 5
            day5ForecastImg.src = `https:${forecast4APi.day.condition.icon}`;
            day5ForecastText.textContent = forecast4APi.day.condition.text;
            dayForecast5.textContent =`${forecast4APi.day.avgtemp_c}°C`;
            
            //Weather Info Forecast Elements
    
            humidity.textContent = `${weatherData.current.humidity} %`;
            windSpeed.textContent = `${weatherData.current.wind_kph} km/h`;
            precipitation.textContent = `${weatherData.current.precip_mm} mm`;
            visibility.textContent = `${weatherData.current.vis_km} km`;
    }
    else{
        console.error("Error");
    }
}