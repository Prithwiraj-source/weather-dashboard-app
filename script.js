const API_KEY = "cf15d9558b10edfdbbc14ef0b5f60f18";

async function getWeather() {
    const city = document.getElementById("cityInput").value;
    const resultDiv = document.getElementById("weatherResult");
    const loading = document.getElementById("loading");

    if (!city) {
        alert("Please enter a city name");
        return;
    }

    loading.style.display = "block";
    resultDiv.innerHTML = "";

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );

        const data = await response.json();

        if (data.cod !== 200) {
            resultDiv.innerHTML = `<p>City not found</p>`;
            return;
        }

        displayWeather(data);

    } catch (error) {
        resultDiv.innerHTML = `<p>Error fetching data</p>`;
    } finally {
        loading.style.display = "none";
    }
}

function displayWeather(data) {
    const resultDiv = document.getElementById("weatherResult");

    const {
        name,
        main: { temp, humidity },
        weather,
        wind
    } = data;

    resultDiv.innerHTML = `
    <h2>${name}</h2>
    <p>🌡️ Temperature: ${temp} °C</p>
    <p>☁️ Condition: ${weather[0].description}</p>
    <p>💧 Humidity: ${humidity}%</p>
    <p>💨 Wind Speed: ${wind.speed} m/s</p>
  `;
}