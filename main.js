// За допомогою ajax - запиту вивести погоду

// http://api.openweathermap.org/data/2.5/weather?q=LVIV&units=metric&APPID=5d066958a60d315387d9492393935c19

// q = XXX - місто, для якого показати погоду
// temp – температура
// pressure - тиск
// description – опис
// humidity – вологість
// speed – швидкість вітру
// deg - напрям у градусах
// icon - значок, де 10d код іконки
// http://openweathermap.org/img/w/10d.png

// Документація: https://openweathermap.org/current

// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

window.onload = function () {
    const API_KEY = '5d066958a60d315387d9492393935c19';
    const API_URL = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

    const selectors = {
        error: document.querySelector('.error'),
        weather: document.querySelector('.weather'),
        city: document.querySelector('.city'),
        description: document.querySelector('.description'),
        temp: document.querySelector('.temp'),
        humidity: document.querySelector('.humidity'),
        wind: document.querySelector('.wind'),
        weatherIcon: document.querySelector('.weather-icon'),
        visibility: document.querySelector('.visibility'),
        pressure: document.querySelector('.pressure'),
    };

    const weatherIconMapping = {
        'Clouds': './images/clouds.png',
        'Clear': './images/clear.png',
        'Drizzle': './images/drizzle.png',
        'Mist': './images/mist.png',
        'Rain': './images/rain.png',
        'Snow': './images/snow.png',
        'Default': './images/404.png',
    };

    const updateUI = (showError = false, data = {}) => {
        selectors.error.style.display = showError ? 'block' : 'none';
        selectors.weather.style.display = showError ? 'none' : 'block';

        if (!showError) {
            selectors.city.textContent = data.name;
            selectors.temp.textContent = `${Math.round(data.main.temp)}°C`;
            selectors.description.textContent = data.weather[0].description;
            selectors.humidity.textContent = `${data.main.humidity}%`;
            selectors.wind.textContent = `${data.wind.speed}km/h`;
            selectors.visibility.textContent = `${data.visibility / 1000} km`;
            selectors.pressure.textContent = `${data.main.pressure} hPa`;
            selectors.weatherIcon.src = weatherIconMapping[data.weather[0].main] || weatherIconMapping.Default;
        }
    };

    const fetchWeather = async (city) => {
        try {
            const response = await fetch(`${API_URL}${city}&appid=${API_KEY}`);
            if (response.status !== 200) throw new Error("Invalid city name");

            const data = await response.json();
            console.log(data);
            updateUI(false, data);
        } catch (error) {
            updateUI(true);
        }
    };

    document.querySelector('.search button').addEventListener('click', () => {
        const city = document.querySelector('.search input').value;
        fetchWeather(city);
    });

    document.querySelector('.search input').addEventListener('keyup', event => {
        if (event.key === 'Enter') {
            const city = event.target.value;
            fetchWeather(city);
        }
    });

}





