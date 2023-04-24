'use strict'

const temperature = document.querySelector('.temp');
const cityName = document.querySelector('.city');
const humidityValue = document.querySelector('.humidity');
const windSpeed = document.querySelector('.wind');
const weatherIcon = document.querySelector('.weather-icon');
const weatherDescp = document.querySelector('.weather-descp');
const weatherCard = document.querySelector('.weather');
const errorMsg = document.querySelector('.error');
const apiKey = '45d290483ac18582a8b494683a8965ac';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');

async function checkWeather(city) {


    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if (response.status === 404) {
        errorMsg.style.display = 'block';
        weatherCard.style.display = 'none';
    }

    else {
        const data = await response.json();

        temperature.innerText = Math.round(data.main.temp) + '°C';
        cityName.innerText = data.name;
        humidityValue.innerText = data.main.humidity + '%';
        windSpeed.innerText = data.wind.speed + 'Km/h';

        if (data.weather[0].main === 'Clear') {
            weatherIcon.setAttribute('src', 'images/clear.png');
            weatherDescp.innerText = `${data.weather[0].main} weather`;
        }
        else if (data.weather[0].main === 'Clouds') {
            weatherIcon.setAttribute('src', 'images/clouds.png');
            weatherDescp.innerText = `${data.weather[0].main.slice(0, -1)}y weather`;
        }
        else if (data.weather[0].main === 'Mist') {
            weatherIcon.setAttribute('src', 'images/mist.png');
            weatherDescp.innerText = `${data.weather[0].main}y weather`;
        }
        else if (data.weather[0].main === 'Rain') {
            weatherIcon.setAttribute('src', 'images/rain.png');
            weatherDescp.innerText = `${data.weather[0].main}y weather`;
        }
        else if (data.weather[0].main === 'Drizzle') {
            weatherIcon.setAttribute('src', 'images/drizzle.png');
            weatherDescp.innerText = `${data.weather[0].main.slice(0, -1)}y weather`;
        }
        else if (data.weather[0].main === 'Snow') {
            weatherIcon.setAttribute('src', 'images/snow.png');
            weatherDescp.innerText = `${data.weather[0].main}y weather`;
        }
        else {
            weatherDescp.innerText = 'Weather Info Not Found...';
        }
        errorMsg.style.display = 'none';
    }
}

// adding event listenser
searchBtn.addEventListener('click', function () {
    checkWeather(searchBox.value);
    weatherCard.style.display = 'block';
});

checkWeather('Japan');
