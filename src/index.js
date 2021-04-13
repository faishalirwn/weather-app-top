async function fetchWeatherData(location) {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=179bae8745da1a9cdaae471cc6487a0f`;
    const response = await fetch(url);
    const weatherData = await response.json();
    return weatherData;
  } catch (error) {
    throw new Error('Error occured');
  }
}
