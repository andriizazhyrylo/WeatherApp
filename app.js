const searchButton = document.querySelector(".searchButton")
const weatherBox = document.querySelector(".weatherBox");
const weatherDetails = document.querySelector(".weatherDetails");
const errorBox = document.querySelector(".error");
const inputField = document.querySelector("input");

const temperature = document.querySelector(".temperature");
const description = document.querySelector(".description");
const humidity = document.querySelector(".humidity");
const windSpeed = document.querySelector(".windSpeed");


searchButton.addEventListener("click", () => {
  const city = inputField.value;
  getWeather(city)
})



function getWeather(city) {
  const apiKey = "b89be5013f6f526aaaaf3dbbd828e300"
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
  fetch(apiUrl)
  .then(response => response.json())
    .then(data => {
      if (data.cod === "404") {
        showError();
        return;
      }

      weatherBox.style.display = "block";
      weatherDetails.style.display = "flex";
      errorBox.style.display = "none";

      temperature.textContent = `Temperature: ${Math.round(data.main.temp)}°C`
      description.textContent = `Condition: ${data.weather[0].description}`
      humidity.textContent =`Humidity: ${data.main.humidity}%`
      windSpeed.textContent = `Wind Speed: ${data.wind.speed}m/s`
    })
    .catch(error => {
      console.log("Ошибка запроса",
        error)
      showError();
  })
 
}
function showError() {
  temperature.textContent = "";
  description.textContent = "";
  humidity.textContent = "";
  windSpeed.textContent = "";

  weatherBox.style.display = "block";
  weatherDetails.style.display = "flex"; 
  errorBox.style.display = "none";

  errorBox.style.display = "block";
  errorBox.style.opacity = "1"; 
  errorBox.style.scale = "1"; 
}

inputField.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    const city = inputField.value
    getWeather(city);
  }
})