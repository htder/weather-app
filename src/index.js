function getObject(data) {
  const { main, description } = data.weather[0];
  const { country } = data.sys;
  const { name, main: weatherData } = data;

  return {
    name,
    country,
    main,
    description,
    weatherData,
  };
}

async function getWeather(location) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=bc268a30fc568797b9cf81bb754ba0f4`,
      { mode: "cors" }
    );
    const data = await response.json();
    return getObject(data);
  } catch (error) {
    return error;
  }
}

const input = document.querySelector("#location");
const submit = document.querySelector(".submit");
const weatherContainer = document.querySelector(".weather-info");

function displayData(data) {
  const html = `<p class="title">${data.name}, ${data.country}</p>
  <p class="description">${data.description}</p>
  <ul>
    <li class="temps">Temperature: ${Math.ceil(
      data.weatherData.temp - 273.15
    )}&#8451</li>
    <li class="temps">Feels like: ${Math.ceil(
      data.weatherData.feels_like - 273.15
    )}&#8451</li>
    <li class="temps">Humidity: ${data.weatherData.humidity}%</li>
  </ul>`;
  weatherContainer.innerHTML = html;
}

submit.addEventListener("click", (event) => {
  event.preventDefault();
  getWeather(input.value).then((value) => {
    displayData(value);
  });
});
