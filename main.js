const search = document.getElementById("cityinput");
const form = document.querySelector("form");
const card = document.querySelector(".card");
const message = document.getElementById("message");
const weatherElements = {
  city: document.getElementById("city"),
  temperature: document.getElementById("temp"),
  humidity: document.getElementById("humidity"),
  wind: document.getElementById("wind"),
  visibility: document.getElementById("visibility"),
  pressure: document.getElementById("pressure"),
  condition: document.getElementById("condition"),
  weathericon: document.getElementById("weather-icon"),
};
const api = `75cb8a41ec8444fcb4f105139262010`;

form.addEventListener("submit", async function getWeatherdata(event) {
  event.preventDefault();
  message.textContent = "";
  const city = search.value.trim();
  const url = `https://api.weatherapi.com/v1/current.json?key=${api}&q=${encodeURIComponent(city)}`;

  try {
    const response = await fetch(url);

    const data = await response.json();
    if (!response.ok) {
      throw new Error(
        data.error?.message || `Request failed with status ${response.status}`,
      );
    }

    displayWeaterInformation(data);
    card.hidden = false;
  } catch (error) {
    console.error("Weather search failed:", error);
    message.textContent = `Please enter the correct city!!`;
  }
});
async function displayWeaterInformation(data) {
  console.log(data);
  weatherElements.city.textContent = `${data.location.name}, ${data.location.country} `;
  weatherElements.temperature.textContent = `${data.current.temp_c}°C`;
  weatherElements.humidity.textContent = `${data.current.humidity}%`;
  weatherElements.wind.textContent = `${data.current.wind_kph}kh/h`;
  weatherElements.visibility.textContent = `${data.current.vis_km}km`;
  weatherElements.pressure.textContent = `${data.current.pressure_mb}hPa`;
  weatherElements.condition.textContent = `${data.current.condition.text}`;
  weatherElements.weathericon.src = `https:${data.current.condition.icon}`;
  weatherElements.weathericon.alt = data.current.condition.text;
}
