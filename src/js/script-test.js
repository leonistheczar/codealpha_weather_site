// HTML elements parsing to variables
const temperatureElement = document.querySelector('.temperature');
const cityElement = document.querySelector('.tempt-city');
const conditionElement = document.querySelector('.city-weather');
const weatherImageElement = document.querySelector('.city-weather-img');
const humidityElement = document.querySelector('.humidityText');
const windSpeedElement = document.querySelector('.windText');
const precipitationElement = document.querySelector('.precipitationText');
const visibilityElement = document.querySelector('.visibilityText');
const weatherCardElement = document.querySelector('.weather-card');

// Forecast Info
const todayForecastElement = document.querySelector('.forecast-text-1');
const tomorrowForecastElement = document.querySelector('.forecast-text-2');
const day3ForecastElement = document.querySelector('.forecast-text-3');
const day4ForecastElement = document.querySelector('.forecast-text-4');
const day5ForecastElement = document.querySelector('.forecast-text-5');

const todayForecastTextElement = document.querySelector('.forecast-1-p');
const tomorrowForecastTextElement = document.querySelector('.forecast-2-p');
const day3ForecastTextElement = document.querySelector('.forecast-3-p');
const day4ForecastTextElement = document.querySelector('.forecast-4-p');
const day5ForecastTextElement = document.querySelector('.forecast-5-p');

// Forecast Images/Icons
const todayForecastImageElement = document.querySelector('.forecast-1-img');
const tomorrowForecastImageElement = document.querySelector('.forecast-2-img');
const day3ForecastImageElement = document.querySelector('.forecast-3-img');
const day4ForecastImageElement = document.querySelector('.forecast-4-img');
const day5ForecastImageElement = document.querySelector('.forecast-5-img');

// API Authentication
const apiKey = '94105ad6ee7b49f382e150412240706';
const defaultCity = 'London';

// Wait for the DOM to get loaded
window.addEventListener('DOMContentLoaded', () => {
  fetchWeatherData();
  updateUI();
});

// Fetch weather data
async function fetchWeatherData(){
  try {
    const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${defaultCity}&days=5`);
    const weatherData = await response.json();
    updateUI(weatherData);
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}

// Update UI
function updateUI(weatherData) {
  if (!weatherData) {
    console.error('Error: weatherData is not available');
    return;
  }

  // UI Main Showcase Elements
  temperatureElement.textContent = `${weatherData.current.temp_c} °C`;
  cityElement.textContent = weatherData.location.name;
  weatherImageElement.src = `https:${weatherData.current.condition.icon}`;
  conditionElement.textContent = weatherData.current.condition.text.substring(0, 22);

  // Set background image based on temperature
  const temperatureThreshold = 28;
  weatherCardElement.style.background = weatherData.current.temp_c > temperatureThreshold
    ? `url(./img/sunny.jpg)`
    : `url(./img/overcast.jpg)`;
  weatherCardElement.style.backgroundRepeat = 'no-repeat';
  weatherCardElement.style.backgroundSize = 'cover';
  weatherCardElement.style.backgroundPosition = 'center center';

  // Weekly Forecast Tags
  todayForecastImageElement.src = `https:${weatherData.forecast.forecastday[0].day.condition.icon}`;
  todayForecastTextElement.textContent = weatherData.current.condition.text.substring(0, 15);
  todayForecastElement.textContent = `${weatherData.current.temp_c}°C`;

  tomorrowForecastImageElement.src = `https:${weatherData.forecast.forecastday[1].day.condition.icon}`;
  tomorrowForecastTextElement.textContent = weatherData.forecast.forecastday[1].day.condition.text.substring(0, 15);
  tomorrowForecastElement.textContent = `${weatherData.forecast.forecastday[1].day.avgtemp_c}°C`;

  day3ForecastImageElement.src = `https:${weatherData.forecast.forecastday[2].day.condition.icon}`;
  day3ForecastTextElement.textContent = weatherData.forecast.forecastday[2].day.condition.text.substring(0, 12);
  day3ForecastElement.textContent = `${weatherData.forecast.forecastday[2].day.avgtemp_c}°C`;

  day4ForecastImageElement.src = `https:${weatherData.forecast.forecastday[3].day.condition.icon}`;
  day4ForecastTextElement.textContent = weatherData.forecast.forecastday[3].day.condition.text.substring(0, 12);
  day4ForecastElement.textContent = `${weatherData.forecast.forecastday[3].day.avgtemp_c}°C`;

  day5ForecastImageElement.src = `https:${weatherData.forecast.forecastday[4].day.condition.icon}`;
  day5ForecastTextElement.textContent = weatherData.forecast.forecastday[4].day.condition.text.substring(0, 12);
  day5ForecastElement.textContent = `${weatherData.forecast.forecastday[4].day.avgtemp_c}°C`;

  // Weather Info Forecast Elements
  humidityElement.textContent = `${weatherData.current.humidity}%`;
  windSpeedElement.textContent = `${weatherData.current.wind_kph} km/h`;
  precipitationElement.textContent = `${weatherData.current.precip_mm}mm`;
  visibilityElement.textContent = `${weatherData.current.vis_km}km`;
}