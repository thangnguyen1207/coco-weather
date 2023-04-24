// assign weather api key
const apiKey = '4205584cb5249e8b77e2ecd881ded4b7';

// create and 
const form = document.querySelector("form");
const searchCity = document.getElementById("search-city");
const weatherData = document.getElementById("weather-data");


form.addEventListener("submit", (event) => {
    event.preventDefault();
    const cityValue = searchCity.value;
    getWeatherData(cityValue);
    form.reset();
})

async function getWeatherData(cityValue){
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`)
        if (!response){
            throw new Error("Failed network response")
        }
        const data = await response.json();
        //find the correct data and pass it to the correct classes.
        //console.log(data);
        const city = data.name;
        const temperature = Math.round(data.main.temp);
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;
        const details = [
            `Feels like: ${Math.round(data.main.temp)} °C`,
            `Humidity: ${(data.main.humidity)} %`,
            `Wind Speed: ${(data.wind.speed)} m/s`
        ] 
        weatherData.querySelector(".city").textContent = city;
        weatherData.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`
        weatherData.querySelector(".temperature").textContent = `${temperature} °C`;
        weatherData.querySelector(".description").textContent = description;
        weatherData.querySelector(".details").innerHTML = details.map((detail) =>`<div>${detail}</div>`).join("");
    } catch (error) {
        weatherData.querySelector(".description").textContent = "Error, please try again!";
    }
}

