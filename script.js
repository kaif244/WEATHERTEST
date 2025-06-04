const API_KEY = "c024e61768fde1b26aa10ed633a43c51";

async function getWeather() {
  const location = document.getElementById('locationInput').value.trim();
  const resultDiv = document.getElementById('weatherResult');

  if (!location) {
    resultDiv.innerHTML = "<p>❗ Please enter a city name.</p>";
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod !== 200) {
      resultDiv.innerHTML = `<p>❌ ${data.message}</p>`;
    } else {
      const icon = data.weather[0].icon;
      const condition = data.weather[0].description;
      const temp = data.main.temp;

      resultDiv.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <img class="weather-icon" src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather Icon" />
        <p><strong>${temp}°C</strong></p>
        <p>${condition}</p>
      `;
    }
  } catch (error) {
    resultDiv.innerHTML = `<p>⚠️ Error fetching data. Please try again later.</p>`;
  }
}
