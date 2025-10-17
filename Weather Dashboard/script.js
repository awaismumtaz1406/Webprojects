const API_KEY = "eddac424287c4cc69a9194431252509";
const BASE_URL = "http://api.weatherapi.com/v1/current.json";

const weatherSection = document.getElementById("weatherSection");

document.getElementById("searchForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const query = document.getElementById("cityInput").value;
  getWeather(query);
});

async function getWeather(query) {
  weatherSection.innerHTML = "<div class='loading'>Loading...</div>";
  try {
    const res = await fetch(`${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(query)}&aqi=yes`);
    if (!res.ok) throw new Error("Location not found");
    const data = await res.json();
    displayWeather(data);
  } catch (err) {
    weatherSection.innerHTML = `<p class='error'>${err.message}</p>`;
  }
}

function displayWeather(data) {
  const w = data.current;
  const l = data.location;
  weatherSection.innerHTML = `
    <div class="weather">
      <div class="weather-info">
        <h2>${l.name}, ${l.country}</h2>
        <p class="time">${l.localtime}</p>
        <h3 class="temp">${w.temp_c}°C <span>(${w.temp_f}°F)</span></h3>
        <p class="condition">${w.condition.text}</p>
      </div>
      <img src="${w.condition.icon}" alt="weather icon" />
    </div>
    <div class="details">
      <div class="detail">Humidity: ${w.humidity}%</div>
      <div class="detail">Wind: ${w.wind_kph} kph</div>
      <div class="detail">Pressure: ${w.pressure_mb} mb</div>
      <div class="detail">Feels like: ${w.feelslike_c}°C</div>
      <div class="detail">UV Index: ${w.uv}</div>
      <div class="detail">Visibility: ${w.vis_km} km</div>
    </div>
  `;
}
