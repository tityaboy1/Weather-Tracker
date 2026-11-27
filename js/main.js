const search = document.getElementById("cityinput");
const form = document.querySelector("form");
const card = document.querySelector(".card");
const forecastcard = document.querySelector(".forecastcard");
const message = document.getElementById("message");
const weatherElements = {
  city: document.getElementById("city"),
  temperature: document.getElementById("temp"),
  chainofrain: document.getElementById("chain-of-rain"),
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
  const forecast = `https://api.weatherapi.com/v1/forecast.json?key=${api}&q=${encodeURIComponent(city)}&days=3`;
  try {
    const response = await fetch(url);
    const forecastResponse = await fetch(forecast);

    const data = await response.json();
    const forecastData = await forecastResponse.json();
    if (!response.ok || !forecastResponse.ok) {
      throw new Error(
        data.error?.message ||
          forecastData.error?.message ||
          `Weather request failed with status ${response.status} or ${forecastResponse.status}`,
      );
    }

    displayWeaterInformation(data);
    displayForecast(forecastData);

    card.hidden = false;
    forecastcard.hidden = false;
  } catch (error) {
    console.error("Weather search failed:", error);
    message.textContent = `Please enter the correct city!!`;
  }
});
async function displayWeaterInformation(data) {
  weatherElements.city.textContent = `${data.location.name}, ${data.location.country} `;
  weatherElements.temperature.textContent = `${data.current.temp_c}°C`;
  weatherElements.chainofrain.textContent = `${data.current.chance_of_rain}%`;
  weatherElements.humidity.textContent = `${data.current.humidity}%`;
  weatherElements.wind.textContent = `${data.current.wind_kph}kh/h`;
  weatherElements.visibility.textContent = `${data.current.vis_km}km`;
  weatherElements.pressure.textContent = `${data.current.pressure_mb}hPa`;
  weatherElements.condition.textContent = `${data.current.condition.text}`;
  weatherElements.weathericon.src = `https:${data.current.condition.icon}`;
  weatherElements.weathericon.alt = data.current.condition.text;
}
function displayForecast(data) {
  const rows = document.querySelectorAll("[data-forecast-day]");
  const days = data.forecast?.forecastday;
  if (!Array.isArray(days) || days.length === 0) {
    throw new Error("The forecast response did not contain any forecast days.");
  }

  const iconNames = {
    thunderstorm: new Set([1087, 1273, 1276, 1279, 1282]),
    snow: new Set([
      1066, 1069, 1072, 1114, 1117, 1204, 1207, 1210, 1213, 1216, 1219, 1222,
      1225, 1237, 1255, 1258, 1261, 1264,
    ]),
    fog: new Set([1030, 1135, 1147]),
    rain: new Set([
      1063, 1150, 1153, 1168, 1171, 1180, 1183, 1186, 1189, 1192, 1195, 1198,
      1201, 1240, 1243, 1246, 1249, 1252,
    ]),
  };

  rows.forEach((row, index) => {
    const day = days[index];
    row.hidden = !day;
    if (!day) return;

    const date = new Date(`${day.date}T00:00:00`);
    const dayName =
      index === 0
        ? "Today"
        : index === 1
          ? "Tomorrow"
          : date.toLocaleDateString(undefined, { weekday: "long" });

    row.querySelector(".forecast-row__day").textContent = dayName;

    const time = row.querySelector("time");
    time.dateTime = day.date;
    time.textContent = date.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    });

    row.querySelector(".forecast-row__condition-name").textContent =
      day.day.condition.text;
    const rainBadge = row.querySelector(".rain-badge");
    const rainChance = day.day.daily_chance_of_rain;
    if (index === 0) {
      weatherElements.chainofrain.textContent = `${rainChance}%`;
    }
    rainBadge.textContent = `${rainChance}% rain`;
    const rainLevel =
      rainChance > 60
        ? "rain-badge--high"
        : rainChance > 30
          ? "rain-badge--medium"
          : "rain-badge--low";
    rainBadge.className = `rain-badge ${rainLevel}`;

    const temperatures = row.querySelectorAll(".forecast-row__temperature > *");
    temperatures[0].textContent = `${day.day.maxtemp_c}°C`;
    temperatures[2].textContent = `${day.day.mintemp_c}°C`;

    const conditionCode = day.day.condition.code;
    const iconName = iconNames.thunderstorm.has(conditionCode)
      ? "thunderstorm"
      : iconNames.snow.has(conditionCode)
        ? "ac_unit"
        : iconNames.fog.has(conditionCode)
          ? "foggy"
          : iconNames.rain.has(conditionCode)
            ? "rainy"
            : conditionCode === 1000
              ? "sunny"
              : conditionCode === 1003
                ? "partly_cloudy_day"
                : "cloud";
    row.querySelector(".forecast-icon").textContent = iconName;
  });
}
