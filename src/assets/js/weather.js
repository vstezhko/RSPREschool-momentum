import i18next from "i18next";

export const weather = (lang) => {

    const cityInput = document.querySelector('input.city')
    const weatherIcon = document.querySelector('.weather-icon')
    const temperature = document.querySelector('.temperature')
    const wind = document.querySelector('.wind')
    const humidity = document.querySelector('.humidity')
    const weatherDescription = document.querySelector('.weather-description')
    const error = document.querySelector('.weather-error')

    const onCityChange = () => {
        if (city === cityInput.value || cityInput.value === '') {
            cityInput.value = city
            return
        }
        city = cityInput.value
        localStorage.setItem('city', cityInput.value)
        getWeather()
    }
    const onCityError = (data) => {
        error.textContent = `Error: ${data.message} for city '${city}'`
        weatherIcon.classList.remove(weatherIcon.classList[2])
        temperature.textContent = ''
        weatherDescription.textContent = ''
        wind.textContent = ''
        humidity.textContent = ''
    }

    cityInput.addEventListener('focus', ()=>{
        cityInput.value = ''
    })

    cityInput.addEventListener('focusout', ()=>{
        onCityChange()
    })

    cityInput.addEventListener('change', ()=>{
        onCityChange()
    })

    let city = localStorage.getItem('city') || 'Минск'
    const apiKey = '026c96d1416c803e3f5f3b9175665442'
    // const lang = 'ru'
    const units = 'metric'


    async function getWeather () {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=${lang}&appid=${apiKey}&units=${units}`
        const resWeather = await fetch(url)
        const data = await resWeather.json()
        try {
            data.weather[0].id
        } catch {
            onCityError(data)
            return
        }
        error.textContent = ''
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = `${Math.round(data.main.temp)}°C`;
        weatherDescription.textContent = data.weather[0].description;
        wind.textContent = `${i18next.t("windSpeed")}: ${(data.wind.speed).toFixed(0)} ${i18next.t("speed")}`
        humidity.textContent = `${i18next.t("humidity")}: ${(data.main.humidity).toFixed(0)} %`
    }

    getWeather()

    cityInput.value = city

}