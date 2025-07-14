 const apiKey = "5ae9d6a1995292cc1745aa8f0d703d04"; 

async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const weatherDiv = document.getElementById("weather");

  if (!city) {
    weatherDiv.innerHTML = "<p>⚠ Please enter a city name.</p>";
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error("City not found");
    }

    const data = await res.json();

    const { name, sys, main, weather, wind } = data;

    weatherDiv.innerHTML = `
      <h2>${name}, ${sys.country}</h2>
      <p><strong>${weather[0].main}</strong> - ${weather[0].description}</p>
      <p>🌡 Temperature: ${main.temp} °C</p>
      <p>💧 Humidity: ${main.humidity}%</p>
      <p>💨 Wind Speed: ${wind.speed} m/s</p>
    `;
  } catch (err) {
    weatherDiv.innerHTML = `<p style="color:red;">❌ ${err.message}</p>`;
  }
}