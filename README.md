# TamDan Weather

A responsive weather dashboard for searching current conditions and a three-day forecast by city name.

demo: https://tamda-weather-nenapk1ng-yaa20.vercel.app/

## Features

- Current temperature, chance of rain, humidity, wind, visibility, pressure, and condition
- Three-day weather forecast with daily high and low temperatures
- English and Khmer language options
- Light and dark themes
- Saved language and theme preferences through `localStorage`
- Responsive layouts for desktop and mobile screens
- Weather icons and condition data powered by WeatherAPI

## Project Structure

```text
html/
  index.html       # Main application page
js/
  language.js      # English and Khmer translations
  main.js          # WeatherAPI requests and page updates
  theme.js         # Light and dark theme handling
style/
  forecast.css     # Forecast card styles
  style.css        # Main layout and weather card styles
  logo.png         # Application logo
```

## Getting Started

### 1. Get a WeatherAPI key

Create a free account at [WeatherAPI](https://www.weatherapi.com/) and obtain an API key.

### 2. Configure the API key

Open `js/main.js` and replace the existing API key value:

```javascript
const api = "YOUR_WEATHERAPI_KEY";
```

> **Security note:** This is a client-side demo. An API key placed in JavaScript is visible to users. Do not use a production or billing-enabled key directly in the browser. For a production app, store the key on a server and expose it through a backend endpoint.

### 3. Run the application

Open `html/index.html` in a modern browser.

For a better local development experience, use the VS Code **Live Server** extension or serve the project with a small local server:

```powershell
python -m http.server 5500
```

Then visit:

```text
http://localhost:5500/html/
```

## Usage

1. Enter a city, city and region, postal code, or supported WeatherAPI location.
2. Select **Search** or press Enter.
3. View the current weather card and three-day forecast.
4. Use the language selector to switch between English and Khmer.
5. Use the theme button to switch between light and dark modes.

## Browser Support

TamDan Weather uses standard HTML, CSS, and JavaScript APIs and is intended for modern browsers.
